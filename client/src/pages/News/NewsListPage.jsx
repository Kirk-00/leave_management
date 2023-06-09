// External Lib Import
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import classNames from "classnames";

// Internal  Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { useSelector } from "react-redux";
import NewsRequest from "../../APIRequest/NewsRequest";
import AleartMessage from "../../helpers/AleartMessage";
import ExportDataJSON from "../../utils/ExportFromJSON";
import DateFormatter from "../../utils/DateFormatter";
import HtmlParser from "../../utils/HtmlParser";

const NewsListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);

  useEffect(() => {
    NewsRequest.NewsList(pageNumber, perPage, searchKey);
  }, [pageNumber, perPage, searchKey]);

  const { NewsLists, TotalNews } = useSelector((state) => state.News);

  const PerPageOnChange = (e) => {
    if (e.target.value === "All") {
      setPerPage(TotalNews);
    } else {
      setPerPage(e.target.value);
    }
  };

  const SearchKeywordOnChange = (e) => {
    const key = e.target.value || 0;
    setSearchKey(key);
  };

  const HandlePageClick = (e) => {
    setPageNumber(e.selected + 1);
  };

  const GoToPage = (e) => {
    setPageNumber(e.target.value);
  };

  const DeleteNews = (id) => {
    AleartMessage.Delete(id, NewsRequest.NewsDelete).then((result) => {
      if (result) {
        NewsRequest.NewsList(pageNumber, perPage, searchKey);
      }
    });
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "News", path: "/news/news-list" },
          {
            label: "News List",
            path: "/news/news-list",
            active: true,
          },
        ]}
        title={"News List " + TotalNews}
      />
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Row className="mb-2">
                <Col sm={5}>
                  <Link
                    to="/news/news-create-update"
                    className="btn btn-danger mb-2"
                  >
                    <i className="mdi mdi-plus-circle me-2"></i> Add News
                  </Link>
                </Col>

                <Col sm={7}>
                  
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-2">
                    <span className="d-flex align-items-center">
                      Search :{" "}
                      <input
                        placeholder={TotalNews + " records..."}
                        className="form-control w-auto ms-1"
                        defaultValue=""
                        onChange={SearchKeywordOnChange}
                      />
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table className="table-centered react-table" responsive>
                    <thead
                      className="table-light"
                      style={{ backgroundColor: "#eef2f7" }}
                    >
                      <tr>
                        <th>News Title</th>
                        <th>News Details</th>
                        <th>Created On</th>
                        <th>News Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NewsLists?.map((record, index) => {
                        return (
                          <tr key={index}>
                            <td>{record?.NewsTitle}</td>
                            <td>
                              {(record?.NewsDetails &&
                                HtmlParser(
                                  record?.NewsDetails.slice(0, 50),
                                )) ||
                                "NA"}
                            </td>
                            <td>{DateFormatter(record?.createdAt)}</td>
                            <td>
                              <span
                                className={classNames("badge", {
                                  "bg-success": record?.NewsStatus,
                                  "bg-danger": !record?.NewsStatus,
                                })}
                              >
                                {record?.NewsStatus ? "Active" : "Deactivated"}
                              </span>
                            </td>
                            <td>
                              <Link
                                to={`/News/News-create-update?id=${record?._id}`}
                                className="action-icon text-warning"
                              >
                                <i className="mdi mdi-square-edit-outline"></i>
                              </Link>
                              <Link
                                className="action-icon text-danger"
                                onClick={() => DeleteNews(record?._id)}
                              >
                                <i className="mdi mdi-delete"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-lg-flex align-items-center text-center pb-1">
                    <div className="d-inline-block me-3">
                      <label className="me-1">Display :</label>
                      <select
                        className="form-select d-inline-block w-auto"
                        onChange={PerPageOnChange}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value="All">All</option>
                      </select>
                    </div>
                    <span className="me-3">
                      Page
                      <strong>
                        {pageNumber} of {Math.ceil(TotalNews / perPage)}
                      </strong>
                    </span>
                    <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
                      <label>Go to page : </label>
                      <input
                        type="number"
                        min={1}
                        className="form-control w-25 ms-1 d-inline-block"
                        defaultValue={1}
                        onChange={GoToPage}
                      />
                    </span>
                    
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewsListPage;
