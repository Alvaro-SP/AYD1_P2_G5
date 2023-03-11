import React, { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import "../styles/Inicio.css";

export function Inicio() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConf, setPassConfirm] = useState("");

  const login = () => {

    if (email !== "") {
      const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex_email.test(email)) {
        if (pass !== "") {
          axios
            .post("http://localhost:5000/login", {
              email: email,
              pass: pass,
            })
            .then((resp) => {
              if (resp.data.res) {
                toast.success("Succesfully Logged", {
                  position: "top-right",
                  duration: 6000,
                  style: {
                    background: "bs-success",
                    color: "#FFFF",
                  },
                });
                if(email === "admin@gmail.com"){
                  localStorage.setItem("admin", true)
                }else{
                  localStorage.setItem("admin", false)
                }
                localStorage.setItem("user", JSON.stringify(resp.data.user));
                localStorage.setItem("ingreso", true);
                window.location.reload(false)
              } else {
                if (resp.data.type === 0) {
                  toast.error("DB Connection Error", {
                    position: "top-right",
                    duration: 6000,
                    style: {
                      background: "bs-danger",
                      color: "#FFFF",
                    },
                  });
                } else {
                  toast.error("Bad Credentials", {
                    position: "top-right",
                    duration: 6000,
                    style: {
                      background: "bs-danger",
                      color: "#FFFF",
                    },
                  });
                }
              }
            })
            .catch(() => {
              toast.error("Error Request", {
                position: "top-right",
                duration: 6000,
                style: {
                  background: "bs-danger",
                  color: "#FFFF",
                },
              });
            });
        } else {
          toast.error("Password Empty", {
            position: "top-right",
            duration: 6000,
            style: {
              background: "bs-danger",
              color: "#FFFF",
            },
          });
        }
      } else {
        toast.error("Incorrect Email", {
          position: "top-right",
          duration: 6000,
          style: {
            background: "bs-danger",
            color: "#FFFF",
          },
        });
      }
    } else {
      toast.error("Email Empty", {
        position: "top-right",
        duration: 6000,
        style: {
          background: "bs-danger",
          color: "#FFFF",
        },
      });
    }
  };

  const register = () => {
    if (name !== "") {
      if (lastName !== "") {
        if (email !== "") {
          const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (regex_email.test(email)) {
            if (pass !== "") {
              if (pass === passConf) {
                axios
                  .post("http://localhost:5000/register", {
                    name: name,
                    lastname: lastName,
                    email: email,
                    pass: pass,
                  })
                  .then((resp) => {
                    if (resp.data.res) {
                      toast.success("Successfully Logged", {
                        position: "top-right",
                        duration: 6000,
                        style: {
                          background: "bs-success",
                          color: "#FFFF",
                        },
                      });
                      localStorage.setItem("user", JSON.stringify(resp.data.user));
                      localStorage.setItem("ingreso", true);
                      window.location.reload(false)
                    } else {
                      if (resp.data.type === 0) {
                        toast.error("DB Connection Error", {
                          position: "top-right",
                          duration: 6000,
                          style: {
                            background: "bs-danger",
                            color: "#FFFF",
                          },
                        });
                      } else {
                        toast.error("Email Existent", {
                          position: "top-right",
                          duration: 6000,
                          style: {
                            background: "bs-danger",
                            color: "#FFFF",
                          },
                        });
                      }
                    }
                  })
                  .catch(() => {
                    toast.error("Error Request", {
                      position: "top-right",
                      duration: 6000,
                      style: {
                        background: "bs-danger",
                        color: "#FFFF",
                      },
                    });
                  });
              } else {
                toast.error("Incorrect Passwords", {
                  position: "top-right",
                  duration: 6000,
                  style: {
                    background: "bs-danger",
                    color: "#FFFF",
                  },
                });
              }
            } else {
              toast.error("Password Empty", {
                position: "top-right",
                duration: 6000,
                style: {
                  background: "bs-danger",
                  color: "#FFFF",
                },
              });
            }
          } else {
            toast.error("Incorrect Email", {
              position: "top-right",
              duration: 6000,
              style: {
                background: "bs-danger",
                color: "#FFFF",
              },
            });
          }
        } else {
          toast.error("Email Empty", {
            position: "top-right",
            duration: 6000,
            style: {
              background: "bs-danger",
              color: "#FFFF",
            },
          });
        }
      } else {
        toast.error("Last Name Empty", {
          position: "top-right",
          duration: 6000,
          style: {
            background: "bs-danger",
            color: "#FFFF",
          },
        });
      }
    } else {
      toast.error("Name Empty", {
        position: "top-right",
        duration: 6000,
        style: {
          background: "bs-danger",
          color: "#FFFF",
        },
      });
    }
  };

  return (
    <section>
      <div className="form-box animate-box">
        <div
          className="card bg-transparent"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
              </div>
              <div
                className="carousel-inner"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className="carousel-item active"
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "20%",
                    paddingLeft: "15%",
                    paddingRight: "15%",
                  }}
                >
                  <div className="row mb-4">
                    <i
                      className="bi bi-person-circle text-white d-flex justify-content-center"
                      style={{ fontSize: "5rem" }}
                    ></i>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="bi bi-key"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          onChange={(e) => setPass(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-dark col-sm-4 offset-sm-4 border-white text-white"
                      onClick={login}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div
                  className="carousel-item"
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "7%",
                    paddingLeft: "15%",
                    paddingRight: "15%",
                  }}
                >
                  <div className="row mb-3">
                    <i
                      className="bi bi-person-plus-fill text-white d-flex justify-content-center"
                      style={{ fontSize: "5rem" }}
                    ></i>
                  </div>
                  <div className="row mb-1">
                    <div className="col">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="bi bi-person"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          aria-label="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col">
                      <div className="col">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-person-vcard"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
                              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            aria-label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col">
                      <div className="col">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-1">
                    <div className="col">
                      <div className="col">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-key"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            onChange={(e) => setPass(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <div className="col">
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            <i className="bi bi-key"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            onChange={(e) => setPassConfirm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-outline-dark col-sm-4 offset-sm-4 border-white text-white"
                      onClick={register}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </section>
  );
}
