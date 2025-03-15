export class AadhaarModel {
    constructor(data = {}) {
      this.aadhaarNumber = data.aadhaarNumber || null;
      this.name = data.name || null;
      this.gender = data.gender || null;
      this.dob = data.dob || null;
      this.address = data.address || null;
      this.pincode = data.pincode || null;
      this.state = data.state || null;
      this.relation = data.relation || null;
      this.careOf = data.careOf || null;
    }
  
    toJSON() {
      return {
        aadhaarNumber: this.aadhaarNumber,
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        address: this.address,
        pincode: this.pincode,
        state: this.state,
        relation: this.relation,
        careOf: this.careOf
      };
    }
  }