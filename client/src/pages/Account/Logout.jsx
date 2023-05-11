// External Lib Import
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";

// Internal Lib Import
import AccountLayout from "./AccountLayout";
import logoutIcon from "../../assets/images/logout-icon.svg";

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        
      </Col>
    </Row>
  );
};

const Logout = () => {
  const { t } = useTranslation();
  return (
    <>
      <AccountLayout bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto">
          
          <p className="text-muted mb-4">
            {t("Signed out successfully.")}
          </p>
          <p className="text-muted">
          {t("Back to ")}{" "}
          <Link to={"/account/login"} className="text-muted ms-1">
            <b>{t("Log In")}</b>
          </Link>
        </p>

          
        </div>
      </AccountLayout>
    </>
  );
};

export default Logout;
