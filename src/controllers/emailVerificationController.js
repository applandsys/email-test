
const verifyEmail = async (req,res)=>{
    try {
        res.status(201).json({message: 'Yes successfully logged in'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const verifyGetMethod = async (req, res) => {
    try {
        res.status(201).json({message: 'Yes successfully logged in'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    verifyEmail,
    verifyGetMethod,
}
