import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// Fashion page is link inside the Banner1 page at last
function Fashion() {
  return (
    <>
      <div className="fashion">
        <Link as={Link} to="fashion/makeup">
          <div className="cardImg">
            <Card className="text-white">
              <Card.Img
                src="https://www.shutterstock.com/image-photo/portrait-gorgeous-elegant-lady-hollywood-260nw-2547377775.jpg"
                alt="Card image"
                height="150px"
                width="200px"
              />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Text className="text-center">
                  <strong>Makeup</strong>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Link>
        <Link as={Link} to="fashion/skincare">
          <div className="cardImg">
            <Card className="text-white">
              <Card.Img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkk3UK6xKn0966TSMDWVTu38N4EC1xrc-aODrOaBT80GZoEdKbW9OjMzr-kJpDyuTswf4&usqp=CAU"
                alt="Card image"
                height="150px"
                width="200px"
              />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Text className="text-center">
                  <strong>SkinCare</strong>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Link>
        <Link as={Link} to="fashion/haircare">
          <div className="cardImg">
            <Card className="text-white">
              <Card.Img
                src="https://s3.amazonaws.com/salonclouds-uploads/blog/blog_1650430653404730522.png"
                alt="Card image"
                height="150px"
                width="200px"
              />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Text className="text-center">
                  <strong>HairCare</strong>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Link>
        <Link as={Link} to="fashion/bath&body">
          <div className="cardImg">
            <Card className="text-white ">
              <Card.Img
                src="https://www.skincenterofsouthmiami.com/wp-content/uploads/2018/06/Skin-Center-of-South-Miami-Facials-and-Skin-Care.jpg"
                alt="Card image"
                height="150px"
                width="200px"
              />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Text className="text-center">
                  <strong>Bath & Body</strong>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Link>
        <Link as={Link} to="fashion/fragrance">
          <div className="cardImg">
            <Card className="text-white ">
              <Card.Img
                src="https://png.pngtree.com/thumb_back/fh260/background/20220717/pngtree-fragrant-beauty-model-portrait-with-perfume-bottle-on-pink-background-photo-image_47602066.jpg"
                alt="Card image"
                height="150px"
                width="200px"
              />
              <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
                <Card.Text className="text-center">
                  <strong>Fragrance</strong>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Fashion;
