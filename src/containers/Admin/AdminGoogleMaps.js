import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack";
import LocationSearchInput from "../../components/LocationSearchInput";

function AdminGoogleMaps() {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn && currentUser.adminId) {
      // dispatch(admin_sendTestEmail(currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (!isLoggedIn || !currentUser.adminId) {
    return <Redirect to="/page-404" />;
  }

  return (
    <div>
      <GoBack />

      <p>Google Maps autocomple</p>
      <Container>
        <Row>
          <Col className="text-center">
            <LocationSearchInput />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminGoogleMaps;
