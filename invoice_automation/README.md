# Invoice Template Automation

A Python-based template automation system for modifying Yazle Invoice Template with a user-friendly GUI.

## Features

- **Template-based Invoice Generation**: Modify specific invoice fields without touching the template structure
- **User-friendly UI**: Simple GUI to edit invoice details
- **Data Validation**: Validate all inputs before saving (Quantity, Rate, Budget, VAT)
- **VAT Handling**: Automatic validation for 0% VAT (Non-GCC) and 5% VAT (UAE)
- **Batch Processing**: Support for generating multiple invoices

## Installation

1. Navigate to the project directory:
```bash
cd invoice_automation
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

## Project Structure

```
invoice_automation/
├── config.py              # Configuration and field mappings
├── excel_handler.py       # Excel read/write operations
├── validator.py           # Data validation rules
├── ui.py                  # PySimpleGUI interface
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## Usage

### Running the UI Application

```bash
python ui.py
```

This will open the Invoice Template Editor window where you can:
1. View and edit all invoice fields
2. Validate data automatically
3. Save modified invoices with auto-generated filenames

### Editing Configuration

Edit `config.py` to:
- Adjust cell references to match your template structure
- Add or modify validation rules
- Change field types and labels

## Field Reference

The following fields are editable:

| Field | Type | Notes |
|-------|------|-------|
| Invoice No. | Text | Unique invoice identifier |
| Client Name | Text | Company or individual name |
| Client Address | Text | Full delivery/billing address |
| Client TRN No. | Text | Tax Registration Number |
| Date | Date | Format: DD/MM/YYYY |
| BO No. | Text | Business Order number |
| Delivery Month | Text | Month for delivery |
| Quantity | Number | Must be > 0 |
| Rate | Number | Must be > 0 |
| Budget | Number | Must be > 0 |
| VAT Rate (%) | Number | Must be 0 or 5 |
| Total Amount | Number | Read-only (calculated) |

## Validation Rules

### Numeric Validations
- Quantity, Rate, Budget: Must be positive numbers
- VAT Rate: Must be 0% or 5% only

### Date Validation
- Format: DD/MM/YYYY

### Required Fields
All fields except read-only fields are required

## Generated Files

Modified invoices are saved to:
```
invoice_automation/generated_invoices/Invoice_YYYYMMDD_HHMMSS.xlsx
```

## Customization

### Adding New Fields

1. Open `config.py`
2. Add entry to `INVOICE_FIELDS` dictionary:
```python
'new_field': {
    'label': 'Field Label',
    'sheet': 'Invoice',
    'cell': 'C15',
    'type': 'string'
}
```

3. Add validation rules if needed in `VALIDATION_RULES`
4. Restart the application

### Modifying Cell References

Update the `cell` property in `config.py` for each field to match your template structure.

## Troubleshooting

### Template file not found
- Ensure `Yazle_Invoice_Template_Final.xlsx` is in the parent directory
- Update `TEMPLATE_FILE` path in `config.py`

### Cell reference errors
- Verify cell references in `config.py` match your Excel template
- Use format like 'B2', 'C10', etc.

### Validation failures
- Check data types match field requirements
- Ensure VAT rate is 0 or 5
- Ensure all required fields have values

## Future Enhancements

- [ ] Batch invoice generation from CSV
- [ ] Email integration for sending invoices
- [ ] Invoice preview before saving
- [ ] Support for multiple templates
- [ ] Database backend for invoice history
- [ ] Automatic calculation fields (VAT, Total)
- [ ] Invoice template designer

## Support

For issues or feature requests, contact the development team.
