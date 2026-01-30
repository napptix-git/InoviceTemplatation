"""
Configuration file for Invoice Template Automation
"""

# Template fields mapping
INVOICE_FIELDS = {
    'invoice_no': {
        'label': 'Invoice No.',
        'sheet': 'Invoice',
        'cell': 'B2',  # Adjust based on your template
        'type': 'string'
    },
    'client_name': {
        'label': 'Client Name',
        'sheet': 'Invoice',
        'cell': 'B3',
        'type': 'string'
    },
    'client_address': {
        'label': 'Client Address',
        'sheet': 'Invoice',
        'cell': 'B4',
        'type': 'string'
    },
    'client_trn': {
        'label': 'Client TRN No.',
        'sheet': 'Invoice',
        'cell': 'B5',
        'type': 'string'
    },
    'date': {
        'label': 'Date',
        'sheet': 'Invoice',
        'cell': 'B6',
        'type': 'date'
    },
    'bo_no': {
        'label': 'BO No.',
        'sheet': 'Invoice',
        'cell': 'B7',
        'type': 'string'
    },
    'delivery_month': {
        'label': 'Delivery Month',
        'sheet': 'Invoice',
        'cell': 'B8',
        'type': 'string'
    },
    'quantity': {
        'label': 'Quantity',
        'sheet': 'Invoice',
        'cell': 'B9',
        'type': 'numeric'
    },
    'rate': {
        'label': 'Rate',
        'sheet': 'Invoice',
        'cell': 'B10',
        'type': 'numeric'
    },
    'budget': {
        'label': 'Budget',
        'sheet': 'Invoice',
        'cell': 'B11',
        'type': 'numeric'
    },
    'vat_rate': {
        'label': 'VAT Rate (%)',
        'sheet': 'Invoice',
        'cell': 'B12',
        'type': 'numeric',
        'validation': 'VAT should be 0% for Non-GCC or 5% for UAE'
    },
    'total_amount': {
        'label': 'Total Amount',
        'sheet': 'Invoice',
        'cell': 'B13',
        'type': 'numeric',
        'read_only': True
    }
}

# File paths
TEMPLATE_FILE = '../Yazle_Invoice_Template_Final.xlsx'
OUTPUT_FOLDER = './generated_invoices/'

# Validation rules
VALIDATION_RULES = {
    'quantity': {'min': 0, 'max': None},
    'rate': {'min': 0, 'max': None},
    'budget': {'min': 0, 'max': None},
    'vat_rate': {'allowed_values': [0, 5]},
}
