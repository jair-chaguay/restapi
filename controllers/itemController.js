const admin = require('firebase-admin');
const db = admin.firestore();

exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    const itemRef = await db.collection('items').add(data);
    res.status(201).send(`Created a new item: ${itemRef.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const itemsSnapshot = await db.collection('items').get();
    const items = [];
    itemsSnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getItem = async(req, res) =>{
  try{
    const itemId=req.params.id;
    const itemDoc= await db.collection('items').doc(itemId).get();
    if(itemDoc.exists){
      const itemD= {id: doc.id, ...itemDoc.data()};
      res.status(200).json(itemD);
    }else{
      res.status(400).send('Item not found');
    }
  }catch(error){
    res.status(400).send(error.message);
  }
};

exports.updateItem= async(req, res) =>{
  try{
    const itemId=re.params.id;
    const data = req.body;
    const itemUpdate=  db.collection('items').doc(itemId).get();
    await itemUpdate.update(data);
    res.status(200).send('Item update');
  }catch(error){
    res.status(400).send(error.message);
  }
}

exports.deleteItem = async(req, res) => {
  try{
    const itemId= re.params.id;
    await db.collection('items').doc(itemId).delete();
  }catch(error){
    res.status(400).send(error.message);
  }
}