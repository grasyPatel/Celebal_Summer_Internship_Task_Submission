import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import  {useState}  from "react";


const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);

 
  return (
    <div className="new">
      <Sidebar />
      <div className="newcontainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              className="image"
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="no image"
            />
          </div>
          <div className="right">
            <form className="user-form">
              <div class="form-grid">
                <div className="form-group file-upload">
                  <label htmlFor="file" className="custom-file-label">
                    <UploadFileIcon />
                    <span>Upload Image</span>
                  </label>
                  <input type="file" id="file" name="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                {inputs.map((input) => (
                  <div class="form-group">
                    <label for={input.id}>{input.label}</label>
                    <input
                      type="text"
                      id={input.id}
                      name={input.name}
                      placeholder={input.placeholder}
                      required
                    />
                  </div>
                ))}
              </div>

              <button type="submit" class="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
