/**
 * 本地数据库
 */
class StoreDB {
  db = null;

  constructor(db) {
    [this.db] = [db]
  }

  get(name) {
    const permissionKeys = this.db.getItem(name);
    return permissionKeys ? JSON.parse(permissionKeys) : null
  }

  set(name, value) {
    this.db.setItem(name, JSON.stringify(value));
  }

  remove(name) {
    this.db.removeItem(name)
  }
}

export default new StoreDB(window.sessionStorage)
