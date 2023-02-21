import logo from "./logo.svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [date1, setDate1] = useState("2021-01-01");
  const [date2, setDate2] = useState("2021-01-01");
  const [images, setImages] = useState(null);
  const [imagesGrouped, setImagesGrouped] = useState([]);
  const fileElement = useRef();
const [isloading, setIsloading] = useState(false)
  const onConvertToPNG = () => {
       setIsloading(true)
    const formData = new FormData();
    const image = fileElement.current.files[0];
    formData.append("file", image);
    axios.post("http://localhost:8000/convert", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
       alert("Convertida correctamente!")
       setIsloading(false)

    });
  };

  const showImages = () => {
    console.log(date1);
    console.log(date2);

    axios
      .get(`http://localhost:8000/findImages?date1=${date1}&date2=${date2}`)
      .then((res) => {
        setImages(res.data);
      });

      axios
      .get(`http://localhost:8000/groupByTime?date1=${date1}&date2=${date2}`)
      .then((res) => {
        console.log(res);
        setImagesGrouped(res.data);
      });
  };

  return (
    <>
      <div>
        <div className="choose">
          <div>
            <label className="file-select" for="image">
              Choose a picture:{" "}
            </label>
            <input
              type="file"
              id="src-file1"
              name="image"
              accept="image/png, image/jpeg"
              ref={fileElement}
            />
          </div>
          <button className="button" onClick={onConvertToPNG}>
            Convert to PNG
          </button>
          {isloading && <h4>Cargando...</h4>}

          <div className="date">
            <label for="start">Start date: </label>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={date1}
              min="2023-01-01"
              max="2024-12-31"
              onChange={(e) => setDate1(e.target.value)}
            ></input>
          </div>

          <div>
            <label for="start">End date: </label>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={date2}
              min="2023-01-01"
              max="2024-12-31"
              onChange={(e) => setDate2(e.target.value)}
            ></input>
          </div>

          <button className="button" onClick={showImages}>
            Show
          </button>
          <div className="container_picture">
            <div className="pictures">
              {!images && <h5>No fueron imagenes encontradas en ese rango de fechas</h5>}
              {images &&
                images.map((image) => (
                  <img
                    className="pictures"
                    key={image._id}
                    width={200}
                    height={200}
                    src={image.url}
                    alt={image.imageName}
                  />
                ))}
            </div>
          </div>
          {imagesGrouped.length > 0 && (
            <table>
              <tr>
                <th>Hora</th>
                <th>Total imagenes procesadas</th>
              </tr>

              {imagesGrouped.map((i) => (
                <tr >
                  <td >{i._id}</td>
                  <td className="datos">{i.total}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
