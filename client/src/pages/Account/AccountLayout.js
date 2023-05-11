import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// images
import Logo from "../../assets/images/logo.png";

const AccountLayout = ({ bottomLinks, children }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (document.body) document.body.classList.add("authentication-bg");

    return () => {
      if (document.body) document.body.classList.remove("authentication-bg");
    };
  }, []);

  return (
    <>
      <div className="account-pages  pt-sm-5  pb-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <Card.Body className="bg-dark text-light">{children}</Card.Body>
              </Card>

              {bottomLinks}
            </Col>
          </Row>
        </Container>
      </div>
      
    </>
  );
};

export default AccountLayout;
