import Like from "../model/like.model.js"
export const getlikepost = async (req, res) => {
    try {
        const userid = req.user.userid;
        const postid = req.params.postid;
        if (userid) {
            if (postid) {
                const likepost = await Like.findOne({ user: userid, post: postid })
                if (likepost) {
                    return res.status(200).json({
                        success: true,
                        message: "likepost is found ",
                        liked:true
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "likepost is not found ",
                        liked:false
                    })
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "post is not found "
                })
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "user is not found "
            })
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `something went wrong while finding like post and error is${error}`
        })
    }
}