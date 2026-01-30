"""
Validation module for invoice data
"""

from config import VALIDATION_RULES, INVOICE_FIELDS


class InvoiceValidator:
    """Validate invoice data before saving"""
    
    def __init__(self):
        self.errors = []
        self.warnings = []
    
    def validate_field(self, field_key, value):
        """Validate a single field"""
        self.errors = []
        self.warnings = []
        
        if field_key not in INVOICE_FIELDS:
            self.errors.append(f"Unknown field: {field_key}")
            return False
        
        field_config = INVOICE_FIELDS[field_key]
        field_type = field_config.get('type', 'string')
        
        # Check if required (non-empty)
        if value is None or str(value).strip() == '':
            self.errors.append(f"{field_config['label']} is required")
            return False
        
        # Type validation
        if field_type == 'numeric':
            try:
                float(value)
            except (ValueError, TypeError):
                self.errors.append(f"{field_config['label']} must be a number")
                return False
        
        elif field_type == 'date':
            try:
                if isinstance(value, str):
                    # Try common date formats
                    from datetime import datetime
                    datetime.strptime(value, "%d/%m/%Y")
            except:
                self.errors.append(f"{field_config['label']} must be in DD/MM/YYYY format")
                return False
        
        # Specific field validations
        if field_key in VALIDATION_RULES:
            rules = VALIDATION_RULES[field_key]
            
            if 'min' in rules and field_type == 'numeric':
                if float(value) < rules['min']:
                    self.errors.append(f"{field_config['label']} must be >= {rules['min']}")
                    return False
            
            if 'max' in rules and field_type == 'numeric':
                if rules['max'] and float(value) > rules['max']:
                    self.errors.append(f"{field_config['label']} must be <= {rules['max']}")
                    return False
            
            if 'allowed_values' in rules:
                try:
                    val = float(value) if field_type == 'numeric' else value
                    if val not in rules['allowed_values']:
                        self.errors.append(f"{field_config['label']} must be one of {rules['allowed_values']}")
                        return False
                except:
                    self.errors.append(f"{field_config['label']} validation failed")
                    return False
        
        return True
    
    def validate_all(self, data_dict):
        """Validate all fields in data dictionary"""
        all_errors = []
        
        for field_key, value in data_dict.items():
            if not self.validate_field(field_key, value):
                all_errors.extend(self.errors)
        
        self.errors = all_errors
        return len(all_errors) == 0
    
    def get_errors(self):
        """Get all validation errors"""
        return self.errors
    
    def get_warnings(self):
        """Get all validation warnings"""
        return self.warnings
