"""
PySimpleGUI-based UI for Invoice Template Automation
"""

import PySimpleGUI as sg
from config import INVOICE_FIELDS
from excel_handler import ExcelHandler
from validator import InvoiceValidator
import os


class InvoiceUI:
    """User Interface for Invoice Template Automation"""
    
    def __init__(self):
        sg.theme('LightBlue2')
        self.excel_handler = ExcelHandler()
        self.validator = InvoiceValidator()
        self.current_data = {}
        
    def load_template(self):
        """Load template file"""
        try:
            self.excel_handler.load_template()
            self.current_data = self.excel_handler.get_all_template_values()
            return True
        except Exception as e:
            sg.popup_error(f"Error loading template: {str(e)}")
            return False
    
    def create_window(self):
        """Create the main UI window"""
        layout = [
            [sg.Text('Invoice Template Editor', font=('Any', 16, 'bold'))],
            [sg.Separator()],
        ]
        
        # Add fields for each invoice element
        for field_key, field_config in INVOICE_FIELDS.items():
            label = field_config['label']
            is_readonly = field_config.get('read_only', False)
            field_type = field_config.get('type', 'string')
            
            # Get current value or empty string
            current_value = self.current_data.get(field_key, '')
            if current_value is None:
                current_value = ''
            
            # Special handling for different field types
            if field_type == 'date':
                layout.append([
                    sg.Text(label, size=(20, 1)),
                    sg.Input(str(current_value), key=field_key, readonly=is_readonly, size=(30, 1))
                ])
            elif field_type == 'numeric':
                layout.append([
                    sg.Text(label, size=(20, 1)),
                    sg.Input(str(current_value), key=field_key, readonly=is_readonly, size=(30, 1))
                ])
            else:
                layout.append([
                    sg.Text(label, size=(20, 1)),
                    sg.Input(str(current_value), key=field_key, readonly=is_readonly, size=(30, 1))
                ])
        
        layout.append([sg.Separator()])
        
        # Buttons
        layout.append([
            sg.Button('Save Invoice', button_color=('white', 'green'), size=(15, 1)),
            sg.Button('Clear', size=(15, 1)),
            sg.Button('Exit', button_color=('white', 'red'), size=(15, 1))
        ])
        
        layout.append([
            sg.Multiline(size=(80, 5), key='-OUTPUT-', disabled=True)
        ])
        
        return sg.Window('Invoice Template Automation', layout, finalize=True)
    
    def run(self):
        """Run the UI"""
        if not self.load_template():
            return
        
        window = self.create_window()
        
        while True:
            event, values = window.read()
            
            if event == sg.WINDOW_CLOSED or event == 'Exit':
                break
            
            elif event == 'Save Invoice':
                self.handle_save(window, values)
            
            elif event == 'Clear':
                self.handle_clear(window)
        
        window.close()
        self.excel_handler.close()
    
    def handle_save(self, window, values):
        """Handle save button click"""
        try:
            # Prepare data dictionary
            data_to_save = {}
            for field_key in INVOICE_FIELDS.keys():
                if field_key in values:
                    data_to_save[field_key] = values[field_key]
            
            # Validate data
            if not self.validator.validate_all(data_to_save):
                errors = self.validator.get_errors()
                error_msg = "Validation Errors:\n" + "\n".join(errors)
                sg.popup_error(error_msg, title="Validation Failed")
                return
            
            # Update and save
            self.excel_handler.update_invoice(data_to_save)
            output_path = self.excel_handler.save_invoice()
            
            output_text = f"✓ Invoice saved successfully!\n\nLocation: {output_path}"
            window['-OUTPUT-'].update(output_text)
            sg.popup_ok(output_text, title="Success")
            
        except Exception as e:
            error_msg = f"Error saving invoice: {str(e)}"
            window['-OUTPUT-'].update(error_msg)
            sg.popup_error(error_msg, title="Error")
    
    def handle_clear(self, window):
        """Handle clear button click"""
        for field_key in INVOICE_FIELDS.keys():
            if not INVOICE_FIELDS[field_key].get('read_only', False):
                window[field_key].update('')
        window['-OUTPUT-'].update('')


def main():
    """Main entry point"""
    ui = InvoiceUI()
    ui.run()


if __name__ == '__main__':
    main()
