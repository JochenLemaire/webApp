import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import * as userData from "../api/users";


const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [dbUser, setDbUser] = useState(undefined);

  useEffect(() => {
    if (!isLoading) {
      getAccessTokenSilently()
        .then((accessToken) => {
          userData
            .getUser(accessToken)
            .then((res) => {
              setAccessToken(accessToken);
              setDbUser(res);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, getAccessTokenSilently]);


  const deleteUser = () => {
    window.confirm("Are you sure you want to delete your user account?") &&

      userData.deleteUser(accessToken, dbUser.id)
        .then((res) => {
          logout();
        })
        .catch((error) => {
          alert("Delete user failed");
        });
  };

  const download = (accessToken) => {
    var element = document.createElement('a');
    userData.getUserData(accessToken)
      .then((res) => {
        let allUserData = JSON.stringify(res);

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(allUserData));
        element.setAttribute('download', "userdata.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      })
      .catch((err) => console.log(err));

  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <Button className="dataButton" onClick={() => download(accessToken)}>Download all my data</Button>
        </div>
        <div>
          <Button variant="danger" className="deleteButton" onClick={deleteUser}>Delete account</Button>
        </div>
        <div>
          <p><span><b>In case of an issue or any form of objection feel free to contact us via:</b></span><span>Phone: 0654215624</span><span>E-Mail: damien.mesure@student.ehb.be</span></p>
        </div>
      </div>
    )
  );
};

export default Profile;