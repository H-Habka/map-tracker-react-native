import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import Track from "../models/Track.js";

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
    let tracks = await Track.find({ userId: req?.user?._id });
    tracks = tracks.map(track => ({_id : track._id, name : track.name}))

    res.status(200).json(tracks);
});

router.get("/tracks/:_id", async (req, res) => {
    const {_id} = req.params
    const track = await Track.findOne({_id});
    console.log(track)

    res.status(200).json(track);
});

router.post("/tracks", async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations.length)
        return res
            .status(422)
            .json({ message: "You must provide name and locations" });

    try {
        const track = new Track({ name, locations, userId: req?.user?._id });
        await track.save();
        res.status(200).json({message: "success"})
    } catch (err) {
        res.status(422).json({ err: err.message });
    }
});

export default router;
