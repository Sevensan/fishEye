export class Photographer {
    constructor(data){
      this._name = data.name
      this._picture = data.portrait
      this._price = data.price
      this._city = data.city
      this._tagline = data.tagline
      this._id = data.id
    }

    get photographer_name(){
      return this._name
    }
    get photographer_picture(){
      return this._picture
    }
    get photographer_city(){
      return this._city
    }
    get photographer_tagline(){
      return this._tagline
    }
    get photographer_id(){
      return this._id
    }
}