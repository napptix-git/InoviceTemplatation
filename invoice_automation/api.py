"""
Flask API wrapper for Invoice Template Automation
Provides REST endpoints for the React frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import math
from config import INVOICE_FIELDS
from excel_handler import ExcelHandler
from validator import InvoiceValidator
from client_manager import ClientManager

app = Flask(__name__)
CORS(app)

# Initialize handlers
excel_handler = ExcelHandler()
validator = InvoiceValidator()
client_manager = ClientManager()


@app.route('/', methods=['GET'])
def index():
    """API welcome endpoint"""
    return jsonify({
        'message': 'Invoice Automation API',
        'version': '1.0.0',
        'endpoints': {
            '/health': 'Health check',
            '/api/invoice/initial': 'Get initial invoice data',
            '/api/clients': 'Get all clients',
            '/api/clients/add': 'Add new client (POST)',
            '/api/invoice/next-number': 'Get next invoice number',
            '/api/invoice/validate': 'Validate invoice (POST)',
            '/api/invoice/save': 'Save invoice (POST)'
        }
    })

# Load template data on startup
try:
    excel_handler.load_template()
    current_template_data = excel_handler.get_all_template_values()
except Exception as e:
    print(f"Error loading template: {e}")
    current_template_data = {}


@app.route('/api/invoice/initial', methods=['GET'])
def get_initial_data():
    """Get initial invoice data from template"""
    try:
        return jsonify(current_template_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/clients', methods=['GET'])
def get_clients():
    """Get all available clients"""
    try:
        clients = client_manager.get_all_clients()
        return jsonify({
            'clients': [{'name': name, 'address': client_manager.get_client_address(name)} 
                       for name in clients]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/clients/add', methods=['POST'])
def add_client():
    """Add a new client"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        address = data.get('address', '').strip()
        
        if not name:
            return jsonify({'error': 'Client name is required'}), 400
        
        client_manager.add_custom_client(name, address)
        return jsonify({'success': True, 'message': f'Client {name} added successfully'})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/invoice/next-number', methods=['GET'])
def get_next_invoice_number():
    """Get the next invoice number"""
    try:
        number = client_manager.get_next_invoice_number()
        return jsonify({'number': str(number)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/invoice/validate', methods=['POST'])
def validate_invoice():
    """Validate invoice data"""
    try:
        data = request.get_json()
        
        if not validator.validate_all(data):
            errors = validator.get_errors()
            return jsonify({
                'valid': False,
                'errors': errors
            })
        
        return jsonify({'valid': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def _int_to_words(n):
    """Convert integer to words"""
    to19 = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
    tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']

    def words(num):
        if num < 20:
            return to19[num]
        if num < 100:
            return tens[num//10] + ('' if num%10==0 else ' ' + to19[num%10])
        if num < 1000:
            return to19[num//100] + ' Hundred' + ('' if num%100==0 else ' ' + words(num%100))
        for p, w in [(10**9, 'Billion'), (10**6, 'Million'), (1000, 'Thousand')]:
            if num >= p:
                return words(num//p) + ' ' + w + ('' if num%p==0 else ' ' + words(num%p))
        return ''
    return words(n)


@app.route('/api/invoice/save', methods=['POST'])
def save_invoice():
    """Save invoice to template"""
    try:
        form_data = request.get_json()
        
        # Fields that must be present
        required_fields = ['invoice_no', 'client_name', 'date', 'description', 'quantity', 'rate']
        
        # Check required fields
        missing_fields = []
        for field in required_fields:
            if field not in form_data or not form_data[field]:
                missing_fields.append(field)
        
        if missing_fields:
            return jsonify({
                'success': False,
                'errors': [f"Missing required fields: {', '.join(missing_fields)}"]
            }), 400
        
        # Calculate due date (date + 30 days)
        date_str = form_data.get('date', '')
        if date_str:
            try:
                parsed = datetime.strptime(date_str, "%d/%m/%Y")
                due_dt = parsed + timedelta(days=30)
                due_str = due_dt.strftime("%d/%m/%Y")
                form_data['due_date'] = due_str
            except Exception as e:
                return jsonify({
                    'success': False,
                    'errors': [f"Invalid date format. Use DD/MM/YYYY: {str(e)}"]
                }), 400
        
        # Ensure calculated fields
        try:
            quantity = float(form_data.get('quantity', 0) or 0)
            rate = float(form_data.get('rate', 0) or 0)
            budget = (quantity * rate) / 1000
            form_data['budget'] = budget
            
            # VAT calculation
            vat_rate_str = form_data.get('vat_rate', 'non-GCC (0%)')
            vat_percent = 5 if 'GCC' in vat_rate_str else 0
            vat_amount = (budget * vat_percent) / 100
            form_data['vat_amount'] = vat_amount
            form_data['vat_rate'] = f"VAT({vat_percent}%)"
            
            # Total amount
            total_amount = budget + vat_amount
            form_data['total_amount'] = total_amount
            
            # Total in words
            dollars = int(math.floor(abs(total_amount)))
            cents = int(round((abs(total_amount) - dollars) * 100))
            words_parts = []
            if dollars == 0:
                words_parts.append('Zero Dollars')
            else:
                words_parts.append(f"{_int_to_words(dollars)} Dollars")
            if cents > 0:
                words_parts.append(f"and {_int_to_words(cents)} Cents")
            total_words = ' '.join(words_parts)
            form_data['total_in_words'] = total_words.upper()
        except Exception as e:
            return jsonify({
                'success': False,
                'errors': [f"Error calculating fields: {str(e)}"]
            }), 400
        
        # Save invoice
        try:
            excel_handler.update_invoice(form_data)
            inv_no = form_data.get('invoice_no', 'Invoice')
            safe_name = str(inv_no).strip().replace('/', '-').replace('\n', '_')
            filename = f"{safe_name}.xlsx"
            
            output_path = excel_handler.save_invoice(output_filename=filename)
            
            # Increment invoice number
            client_manager.increment_invoice_number()
            
            return jsonify({
                'success': True,
                'message': 'Invoice saved successfully',
                'output_path': output_path
            })
        except Exception as e:
            return jsonify({
                'success': False,
                'errors': [f"Error saving invoice: {str(e)}"]
            }), 500
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f"Unexpected error: {str(e)}"
        }), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
