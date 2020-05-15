const cloudinary = require('cloudinary');
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');

cloudinary.config({
    cloud_name: 'duojkrgue',
    api_key: '139199549653668',
    api_secret: 'jGhpeMoVqD-iw1S-TNtppncXqPQ'
});

module.exports = {
    UploadImage(req, res) {
        cloudinary.uploader.upload(req.body.image, async result => {
            await User.update({
                    _id: req.user._id
                }, {
                    $push: {
                        images: {
                            imgId: result.public_id,
                            imgVersion: result.version,
                            imgUrl: result.url
                        }
                    }
                })
                .then(() =>
                    res
                    .status(HttpStatus.OK)
                    .json({ message: 'Image uploaded successfully' })
                )
                .catch(err =>
                    res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error uploading image' })
                );
        });
    },

    async SetDefaultImage(req, res) {
        const { imgId, imgVersion } = req.params;

        await User.update({
                _id: req.user._id
            }, {
                picId: imgId,
                picVersion: imgVersion
            })
            .then(() =>
                res.status(HttpStatus.OK).json({ message: 'Default image set' })
            )
            .catch(err =>
                res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Error occured' })
            );
    }
};