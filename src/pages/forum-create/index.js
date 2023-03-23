import React from 'react';
import "./style.scss";


const ForumCreate = () => {
    
    return (
        <div>
            {/* <h1>Tạo bài đăng</h1>
            <form>
                
                <div>
                    <label for="title">Tiêu đề:</label><br>
                    <input type="text" id="title" name="title"><br>
                </div>
                <div>
                    <label for="content">Nội dung:</label><br>
                    <textarea id="content" name="content" rows="5" cols="50"></textarea><br>
                </div>


                <button type="submit">Đăng bài</button>
            </form> */}

            <h1>Tạo bài đăng</h1>  
            <form className='post-form'>              
                <div>
                    <label for="content">Nội dung bài đăng:</label>
                    <textarea id="content" name="content" required></textarea>
                </div>
                <button type="submit">Đăng bài</button>
            </form>
        </div>
    );
};

export default ForumCreate;