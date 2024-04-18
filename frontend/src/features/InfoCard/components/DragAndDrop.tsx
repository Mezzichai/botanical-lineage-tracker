import { faArrowUpFromBracket, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DragDropStyles from '../styles/DragDropStyles.module.css'
import { useState } from "react";

type Props = {
  setImages: (e) => void
  images: string[]
}
const DragAndDrop:React.FC<Props> = ({
  images,
  setImages
}) => {

  const [hoveredId, setHoveredId] = useState("")

  const readFile = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleManualUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const images = await Promise.all(files.map(async (file) => {
      try {
        const imageDataUrl = await readFile(file);
        return imageDataUrl
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }))
    setImages(images)
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles).slice(0, 5);
      const images = await Promise.all(newFiles.map(async (file) => {
        try {
          const imageDataUrl = await readFile(file);
          return imageDataUrl
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }))
      setImages(prevFiles => [...prevFiles, ...images]);
    }
  };

  const handleHover = (e) => {
    setHoveredId(e.currentTarget.id)
  }

  const handleUnhover = () => {
    setHoveredId("")
  }

  const handleRemoveFile = (index: number) => {
    setImages(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // useEffect(() => {
  //   onFilesSelected(files);
  // }, [files, onFilesSelected]);

  return (
    <div className={DragDropStyles.dragDrop}>
      <div
        className={`${DragDropStyles.documentUploader} ${
          images.length > 0 ? `${DragDropStyles.uploadBox} active` : `${DragDropStyles.uploadBox}`
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <div className={DragDropStyles.uploadInfo}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <div>
              <p>Drag and drop up to 5 images of this plant</p>
            </div>
          </div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleManualUpload}
            accept=".jpeg, .png"
            multiple
          />
          <label htmlFor="browse" className={DragDropStyles.browseBtn}>
            Browse files
          </label>
        </>

        {images.length > 0 && (

          //APPLY SAME PATTERN TO AGGREGATE NODE WITH HOVERING
          <div className={DragDropStyles.uploadedPictures} >
            {images.map((image, index) => (
              <div className={DragDropStyles.imageContainer} id={`image ${index}`} onMouseEnter={(e)=>handleHover(e)} onMouseLeave={handleUnhover}>
                <button onClick={() => handleRemoveFile(index)} className={`${DragDropStyles.removeImage} ${hoveredId === `image ${index}` ? DragDropStyles.visibleRemoveButton : ""}`}>
                  <FontAwesomeIcon icon={faX}/>
                </button>
                <img id={index === 0 ? DragDropStyles.featuredImage : ""} src={image} alt="profile" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;