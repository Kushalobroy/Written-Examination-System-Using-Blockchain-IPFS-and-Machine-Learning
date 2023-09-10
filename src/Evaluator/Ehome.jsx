import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Admin/sidebar";
import "../Admin/sidebar.css";
function Ehome() {
    return (
        <div>
            <div className="row">
                <div className="col-md-3"> <Sidebar /></div>
                <div className="col-md-9">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand text-primary mx-3 " href="">Navbar</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNav">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item p-2">
                                        <a class="nav-link" href="#contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Ehome;