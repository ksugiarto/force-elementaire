import { Model, NonAttribute } from "sequelize";

class ModelExtended<M extends Model> extends Model {
  static nameTitleCase: NonAttribute<string> = '';

  static async findByPkOrDie(pk: number, options = {}) {
    const x = await this.findByPk(pk, options);
    console.log('== pk:', pk);
    console.log('== x:', x);
    // @ts-ignore
    if (!x) throw new Error(`Unable to find ${this.nameTitleCase}`);
    return x;
  }
}

export default ModelExtended;