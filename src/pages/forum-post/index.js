import React from 'react';

const ForumPost = (props) => {
    const commentList = [
        { user: "Thầy Thành", comment: "Để thầy xem nhé." },
        { user: "Trần Công B", comment: "Em cũng bị chấm sai ạ." },
    ];

    return (
        <div>
            <h1>Thắc mắc điểm</h1>
            <div>
                <p>Nguyễn Văn A</p>
                <p>Bài tập này em trả lời đúng 25/30 câu nhưng bị chấm nhầm 22/30 câu. Mong thầy chấm lại</p>
            </div>

            <h2>Bình luận</h2>
            {commentList.map((el) => (
                <ul>
                    <li class="px-2 py-3 border-top">
                        <span>{el.user}</span>
                        <span>{el.comment}</span>
                    </li>
                </ul>
            ))}          

            <h2>Thêm bình luận mới</h2>
            <form id="comment-form">
                <div>
                    <label for="content">Nội dung bình luận:</label>
                    <textarea id="content" name="content" required></textarea>
                </div>
                <button type="submit">Đăng bình luận</button>
            </form>
        </div>
    );
};

export default ForumPost;