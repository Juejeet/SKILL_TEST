import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: ""
    });

    const [message, setMessage] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/books",
                formData
            );

            setMessage(response.data.message);


            // Clear form
            setFormData({
                title: "",
                author: "",
                isbn: "",
                category: "",
                publicationYear: ""
            });

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    return (

        <div className="container">

            <h2>Library Book Management System</h2>

            <form onSubmit={handleSubmit}>

                <label>Book Title</label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />


                <label>Author Name</label>

                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />


                <label>ISBN</label>

                <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                />


                <label>Category</label>

                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />


                <label>Publication Year</label>

                <input
                    type="number"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleChange}
                />


                <button type="submit">
                    Add Book
                </button>

            </form>


            {message && (
                <p className="message">
                    {message}
                </p>
            )}

        </div>

    );
}

export default App;