import { text } from "express";
import sanitizeHtml from 'sanitize-html';


export class TextParser {
    static parseAadhaarData(inText) {

       const text=this.sanitizeText(inText)
      const result = {};
      
      // Extract Aadhaar number (12 digits)
      const aadhaarMatch = text.match(/(\d{4}\s\d{4}\s\d{4})/);
      if (aadhaarMatch) {
        result.aadhaarNumber = aadhaarMatch[1].replace(/\s/g, '');
      }
      
      // Extract name
      const nameMatch = text.match(/([A-Z][a-z]+ [A-Z][a-z]+(?: [A-Z][a-z]*)?)/);
      if (nameMatch) {
        result.name = nameMatch[1].trim();
      }
      
      // Extract gender
      const genderMatch = text.match(/Female|Male/i);
      if (genderMatch) {
        result.gender = genderMatch[0];
      }
      
      // Extract date of birth
      const dobMatch = text.match(/Birth:\s*(\d{4})/i) || 
                      text.match(/DOB\s*:\s*(\d{2}\/\d{2}\/\d{4})/i) || 
                      text.match(/Date of Birth\s*:\s*(\d{2}\/\d{2}\/\d{4})/i) ||
                      text.match(/Year of Birth\s*:\s*(\d{4})/i);
      if (dobMatch) {
        result.dob = dobMatch[1];
      }
      
      // Extract pincode
      const pinMatch = text.match(/(\d{6})/);
      if (pinMatch) {
        result.pincode = pinMatch[1];
      }
      
      // Extract address
      const addressMatch = text.match(/Address:\s*(.*?)(?=\n\n|\n[A-Z]+:|\n\d{6}|$)/s);
      if (addressMatch) {
        const lines = addressMatch[1].split('\n');
        const filteredLines = [];
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.includes('=') && 
              !trimmedLine.includes('@') && 
              !trimmedLine.includes('www') &&
              !trimmedLine.includes('1800')) {
            filteredLines.push(trimmedLine);
          }
          if (result.pincode && trimmedLine.includes(result.pincode)) {
            break;
          }
        }
        
        result.address = filteredLines
          .join(', ')
          .replace(/,\s*,/g, ',')
          .replace(/,\s*$/, '')
          .trim();
          
        // Add pincode to address if not already there
        if (result.pincode && !result.address.includes(result.pincode)) {
          result.address = `${result.address}, ${result.pincode}`;
        }
      }
      
      // Extract relation
      const relationMatch = text.match(/Husband\s*:\s*([A-Z][A-Z\s]+)/i) || 
                            text.match(/Wife\s*:\s*([A-Z][A-Z\s]+)/i) ||
                            text.match(/Father\s*:\s*([A-Z][A-Z\s]+)/i) ||
                            text.match(/Mother\s*:\s*([A-Z][A-Z\s]+)/i);
      if (relationMatch) {
        result.relation = relationMatch[0].trim();
      } else {

        const careOfMatch = text.match(/([DS]\/O\s+[A-Z][a-zA-Z\s]+)/);
        if (careOfMatch) {
          result.careOf = careOfMatch[1].trim();
        }
      }
      
      // Extract state
      const stateMatch = text.match(/([A-Z][a-z]+),\s*\d{6}/) || 
                        text.match(/Kerala|കേരള/i);
      if (stateMatch) {
        result.state = stateMatch[1] === 'കേരള' ? 'Kerala' : stateMatch[1];
      }
      
      console.log('Parsed Aadhaar data:', result);
      return result;
    }
    static sanitizeText(text) {
        // Remove any HTML or script tags to prevent XSS
        return sanitizeHtml(text, {
          allowedTags: [],      // No HTML tags allowed
          allowedAttributes: {} // No attributes allowed
        });
    }
  }

  