const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const verifyToken = require("./verifyToken");
const homeDir = require('os').homedir();

// Userhome
router.get("/", verifyToken, async (req, res) => {
    const username = req.query.username;
    try {

        const contact = await Contact.find({ username });
        res.status(200).json(contact);

    } catch (err) {
        console.log(err);
    }
});

//CREATE Contact
router.post("/create", verifyToken, async (req, res) => {
    const emailExits = await Contact.findOne({ email: req.body.email });
    const number = await Contact.findOne({ number: req.body.number });
    if (emailExits || number) return res.status(400).send("email or usernmae already Exits")
    const newContact = new Contact(req.body);
    try {
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE by ID
router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        const newContact = await Contact.find({ username: contact.username });
        res.status(200).json({ message: "Deleted successfully", data: newContact });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CONACT BY ID
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        const { username, ...others } = contact._doc;
        res.status(200).json({ ...others });
    } catch (err) {
        res.status(500).json(err);
    }
});



// vcard
router.get("/save/:id", verifyToken, async (req, res) => {
    try {

        var vCardsJS = require("vcards-js");
        const contact = await Contact.findById(req.params.id);
        var vCard = vCardsJS();
        vCard.firstName = contact.firstname;
        vCard.lastName = contact.lastname;
        vCard.email = contact.email;
        vCard.workPhone = contact.number;
        res.set("Content-Type", `text/vcard; name=${contact.firstname}.vcf`);
        res.set("Content-Disposition", `inline; filename=${contact.firstname}.vcf`);
        vCard.saveToFile(`${homeDir}/Downloads/${contact.firstname}.vcf`);
        res.status(200).json({ message: "file downloaded successfully" });
    } catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;