import Content from "../models/ContentModel.js";
import path from "path";
import fs from "fs";

export const getContents = async (req, res) => {
    try {
        const response = await Content.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getContentById = async (req, res) => {
    try {
        const response = await Content.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveContent = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const name = req.body.title;
    const email = req.body.email;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Content.create({ name: name, image: fileName, url: url , email:email });
            res.status(201).json({ msg: "Content Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateContent = async (req, res) => {
    const content = await Content.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!content) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    if (req.files === null) {
        fileName = content.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./public/images/${content.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const name = req.body.title;
    const email = req.body.email;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Content.update({ name: name, image: fileName, url: url , email: email}, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "content Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteContent = async (req, res) => {
    const content = await Content.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!content) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${content.image}`;
        fs.unlinkSync(filepath);
        await Content.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Content Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}