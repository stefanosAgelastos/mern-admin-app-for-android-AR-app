import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/* Create a Schema */
const locationSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'Object', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});
/* Create a mongoose record Model
   Takes the name of the Collection and a Shcema
*/
export default mongoose.model('Location', locationSchema);
