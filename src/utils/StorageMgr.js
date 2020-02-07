

export class StorageMgr{

  static set(name,value) {
    localStorage.setItem(name, value)
  }

  static get(name) {
    const item = localStorage.getItem(name)
    return (item!==null?item:undefined)
  }
  
  static erase(name) {
    localStorage.removeItem(name)
  }

}

// Constant key values for cookies
StorageMgr.keys = {
    TRANSLATIONS: 'translations',
}

export default StorageMgr

