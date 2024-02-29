import * as React from "react";
import check from "../images/check-circle.svg";
import { Link } from "react-router-dom";
// import "./event.css";

export default function Create(props) {
  return (
    <>
      <div className="div">
        <div
          className="div-2"
          style={{
            backgroundImage: `url(https://cdn.builder.io/api/v1/image/assets/TEMP/36c8b221f323430f5124f215841c7cf6a78bd29e22dabec65143ff5e9ab22b21?apiKey=81130fff99a04bb0ab44e20c5639d57c&)`,
          }}
        >
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/36c8b221f323430f5124f215841c7cf6a78bd29e22dabec65143ff5e9ab22b21?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
            className="img"
          /> */}
          <div className="div-3">
            <div className="div-4">
              <div className="div-5">
                <div className="div-6" />
                <div className="div-7">SecureWatch</div>
              </div>
              <div className="div-8">
                <div className="div-9">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c1a57f19800507c4daa5e5c0b494c98bf300150903dfa5296c9bc074b077982?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                    className="img-2"
                  />
                  <div className="div-10">Overview</div>
                </div>
                <div className="div-11">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0444abd482fc83fdfdb7f88dd44288851546c141d0a004061827c78481b893be?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                    className="img-3"
                  />
                  <div className="div-12">Monitor</div>
                </div>
                <div className="div-13">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/311d9a9ac83929317d2be7cb6729e13bf7445eb7cbbc7818d522a03b856c737a?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                    className="img-4"
                  />
                  <div className="div-14">Logs</div>
                </div>
              </div>
              <div className="div-15">
                <div className="div-16">prashantd049@gmail.com</div>
              </div>
            </div>
            <div className="div-17">
              <div className="div-18">
                <div className="column">
                  <div className="div-19">
                    <div className="div-20">
                      <div className="div-21">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa2453f4eee8a08a871f23aa0cd0474b464ee56fbe689f8537bb27f998b70231?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                          className="img-5"
                        />
                        <div className="div-22">Back to Monitors</div>
                      </div>
                      <div className="div-23">Create Monitor</div>
                    </div>
                    <div className="div-24">
                      <Link to="/create">
                        <div className="div-25">
                          <div className="div-26">
                            <div className="div-27">
                              <img
                                loading="lazy"
                                src={check}
                                className="img-6"
                              />
                              <div className="div-28 font-bold">
                                General Information
                              </div>
                            </div>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2886dea935eed3fcd5470af43ca1073b7b6bfc908a06b6b390b7cec5f43f2aac?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                              className="img-7"
                            />
                          </div>
                        </div>
                      </Link>
                      <Link to="/event">
                        <div className="div-29">
                          <div className="div-30">
                            <div className="div-31">
                              <img
                                loading="lazy"
                                src={check}
                                className="img-8"
                              />
                              <div className="div-32 font-bold">Events</div>
                            </div>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d5b9bef2843f9ebac32e9e10126235ee109e7377631eb2542c4c4dd415b097a?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                              className="img-9"
                            />
                          </div>
                        </div>
                      </Link>
                      <Link to="/function">
                        <div className="div-33">
                          <div className="div-34">
                            <div className="div-35">
                              <img
                                loading="lazy"
                                src={check}
                                className="img-10"
                              />
                              <div className="div-36 font-bold">Functions</div>
                            </div>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d5b9bef2843f9ebac32e9e10126235ee109e7377631eb2542c4c4dd415b097a?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                              className="img-11"
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="div-37">
                        <div className="div-38">
                          <div className="div-39">
                            <img
                              loading="lazy"
                              src={check}
                              className="img-12"
                            />
                            <div className="div-40 font-bold">Alerts</div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/12edda73ff44546ed0729419fcf035cbbce6d5a2524bbd94a512bb980c89a6b0?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                            className="img-13"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column-2">
                  <div className="div-41">
                    <div className="div-47">
                      <div className="div-48 font-bold ">Risk Category</div>
                      <div className="div-49">
                        <div className="div-50">
                          <div className="div-51">
                            <div className="div-52">None</div>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bde97b411ac6563ee30b7bf3dee3ef9aa9f00899b0b4e656a29be9bcd2b0db6?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                              className="img-14"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="div-53">
                      <div className="div-54">
                        <div className="div-55">Low Severity</div>
                        <div className="div-56">Medium Severity</div>
                        <div className="div-57">High Severity</div>
                      </div>
                    </div>

                    <div className="div-59 font-bold ">Execute an Action</div>
                    <div className="div-60">
                      <div className="div-61">
                        <div className="div-62">
                          <div className="div-63">None</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bde97b411ac6563ee30b7bf3dee3ef9aa9f00899b0b4e656a29be9bcd2b0db6?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                            className="img-14"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="div-64 font-bold ">
                      Execute an Incident Responce Scenario
                    </div>
                    <div className="div-65">
                      <div className="div-66">
                        <div className="div-67">
                          <div className="div-68">None</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7bde97b411ac6563ee30b7bf3dee3ef9aa9f00899b0b4e656a29be9bcd2b0db6?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
                            className="img-14"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row">
                      <div
                        className="font-bold "
                        style={{ marginRight: `15px`, marginTop: `15px` }}
                      >
                        Alert Threshold
                      </div>
                      <div
                        className="font-bold mr-5"
                        style={{ margin: `15px` }}
                      >
                        Minimum Time between notifications
                      </div>
                    </div>
                    <div className="flex flex-row mt-4">
                      <div
                        className="border border-gray-400 rounded-lg p-4"
                        style={{ marginRight: `15px`, width: `191px` }}
                      >
                        1
                      </div>
                      <div
                        className="border border-gray-400 rounded-lg p-4  "
                        style={{ marginRight: `15px`, width: `136px` }}
                      >
                        0
                      </div>
                      <div>
                        <div
                          className="border border-gray-400 rounded-lg p-4 "
                          style={{
                            marginRight: `15px`,
                            width: `148px`,
                            height: `50px`,
                          }}
                        >
                          Minute
                        </div>
                      </div>
                    </div>

                    <Link to="/monitor">
                      <div className="div-85">Save Monitor</div>
                    </Link>
                  </div>
                </div>

                <div className="cloumn-3">
                  <div className="summary-container border">
                    <div class="summary-header">Monitor Summary</div>
                    <div className="tags-container flex">
                      <div class="tag">Networks</div>
                      <div className="tag">Risk Category</div>
                    </div>
                    <div className="networks-container flex ">
                      <div className="network text-white m-3">MAINNET</div>
                      <div class="severity">Medium Severity</div>
                    </div>
                    <div class="contracts-container">
                      <div class="contracts-header">Contracts</div>
                      <div class="contract-address">0x1d54....49844</div>
                    </div>
                    <div class="conditions-container">
                      <div class="conditions-header">Event Conditions</div>
                      <div
                        class="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        Approval(address,address,uint 256)
                      </div>
                      <div
                        class="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        Transfer(address,address,uint 256)
                      </div>
                      <div class="conditions-header">Function Conditions</div>
                      <div
                        class="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        approve(address,uint 256)
                      </div>
                      <div
                        class="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        decreaseAllowance(address,uint 256)
                      </div>
                      <div
                        class="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        increaseAllowance(address,uint 256)
                      </div>
                      <div
                        className="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        transfer(address,uint 256)
                      </div>
                      <div
                        class="condition"
                        style={{ margin: `0`, padding: `0` }}
                      >
                        transferFrom(address,uint 256)
                      </div>
                    </div>
                    <div class="alerts-container">
                      <div class="alerts-header">Alerts</div>
                      <div className="flex flex-row">
                        <div class="alert">Marked as </div>
                        <div class="alert-severity">Medium Severity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fcfffd;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .div-2 {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 500px;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 50px 60px;
        }
        @media (max-width: 1200px) {
          .div-2 {
            max-width: 100%;
            padding: 0 20px;
          }
        }
        .img {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .div-3 {
          position: relative;
          display: flex;
          width: 100%;
          max-width: 1200px;
          flex-direction: column;
          margin: 21px 0 9px;
        }
        @media (max-width: 1263px) {
          .div-3 {
            max-width: 100%;
          }
        }
        .div-4 {
          border-radius: 25.412px;
          border: 1.059px solid #505050;
          background-color: rgba(48, 48, 48, 0.97);
          align-self: center; /*edited*/
          display: flex;
          margin-right: 42px;
          /* width: 772px; */
          max-width: 100%;
          justify-content: space-between;
          gap: 20px;
          font-weight: 600;
          white-space: nowrap;
          letter-spacing: -0.07px;
          padding: 12px 13px;
        }
        @media (max-width: 1263px) {
          .div-4 {
            margin-right: 10px;
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-5 {
          align-self: start;
          display: flex;
          gap: 10px;
          font-size: 17px;
          color: #fff;
          line-height: 114%;
        }
        @media (max-width: 1263px) {
          .div-5 {
            white-space: initial;
          }
        }
        .div-6 {
          background-color: #0ca851;
          border-radius: 50%;
          width: 35px;
          height: 34px;
        }
        .div-7 {
          font-family: Poppins, sans-serif;
          flex-grow: 1;
          margin: auto 0;
        }
        .div-8 {
          display: flex;
          gap: 17px;
          font-size: 13px;
          color: #fff2f2;
          font-weight: 400;
          letter-spacing: -0.08px;
          line-height: 161%;
          margin: auto 0;
        }
        @media (max-width: 1263px) {
          .div-8 {
            white-space: initial;
          }
        }
        .div-9 {
          justify-content: space-between;
          display: flex;
          gap: 7px;
        }
        @media (max-width: 1263px) {
          .div-9 {
            white-space: initial;
          }
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
          align-self: start;
        }
        .div-10 {
          font-family: Inter, sans-serif;
          flex-grow: 1;
        }
        .div-11 {
          display: flex;
          justify-content: space-between;
          gap: 7px;
        }
        @media (max-width: 1263px) {
          .div-11 {
            white-space: initial;
          }
        }
        .img-3 {
          aspect-ratio: 0.95;
          object-fit: auto;
          object-position: center;
          width: 19px;
          align-self: start;
        }
        .div-12 {
          font-family: Inter, sans-serif;
          flex-grow: 1;
        }
        .div-13 {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }
        @media (max-width: 1263px) {
          .div-13 {
            white-space: initial;
          }
        }
        .img-4 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
          align-self: start;
        }
        .div-14 {
          font-family: Inter, sans-serif;
        }
        .div-15 {
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
          justify-content: center;
          font-size: 15px;
          color: #000;
          line-height: 130%;
        }
        @media (max-width: 1263px) {
          .div-15 {
            white-space: initial;
          }
        }
        .div-16 {
          font-family: Poppins, sans-serif;
          justify-content: center;
          border-radius: 21.144px;
          background-color: #fff;
          padding: 8px 13px;
        }
        @media (max-width: 1263px) {
          .div-16 {
            white-space: initial;
          }
        }
        .div-17 {
          margin-top: 77px;
        }
        @media (max-width: 1263px) {
          .div-17 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-18 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 1263px) {
          .div-18 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 25%;
          margin-left: 0px;
        }
        @media (max-width: 1263px) {
          .column {
            width: 100%;
          }
        }
        .div-19 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1263px) {
          .div-19 {
            margin-top: 40px;
          }
        }
        .div-20 {
          display: flex;
          flex-direction: column;
        }
        .div-21 {
          display: flex;
          justify-content: space-between;
          gap: 3px;
          font-size: 14px;
          color: #7d7d7d;
          font-weight: 400;
          letter-spacing: 0.59px;
          line-height: 108%;
        }
        .img-5 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 32px;
        }
        .div-22 {
          font-family: Poppins, sans-serif;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
        }
        .div-23 {
          color: #000;
          letter-spacing: -0.07px;
          margin-top: 25px;
          white-space: nowrap;
          font: 500 40px/80% Poppins, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 1263px) {
          .div-23 {
            white-space: initial;
          }
        }
        .div-24 {
          display: flex;
          margin-top: 51px;
          flex-direction: column;
          font-size: 17px;
          color: #b1b1b1;
          font-weight: 500;
          white-space: nowrap;
          letter-spacing: 0.5px;
          line-height: 76%;
        }
        @media (max-width: 1263px) {
          .div-24 {
            margin-top: 40px;
            white-space: initial;
          }
        }
        .div-25 {
          border-radius: 20px;
          border: 1px solid #cacaca;
          background-color: #fff;
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: center;
          color: #000;
          padding: 22px 23px;
        }
        @media (max-width: 1263px) {
          .div-25 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-26 {
          justify-content: space-between;
          display: flex;
          gap: 20px;
        }
        @media (max-width: 1263px) {
          .div-26 {
            white-space: initial;
          }
        }
        .div-27 {
          display: flex;
          gap: 11px;
          margin: auto 0;
        }
        @media (max-width: 1263px) {
          .div-27 {
            white-space: initial;
          }
        }
        .img-6 {
          aspect-ratio: 1.05;
          object-fit: auto;
          object-position: center;
          width: 19px;
        }
        .div-28 {
          font-family: Poppins, sans-serif;
          flex-grow: 1;
        }
        @media (max-width: 1263px) {
          .div-28 {
            white-space: initial;
          }
        }
        .img-7 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 26px;
          fill: #0ca851;
        }
        .div-29 {
          border-radius: 20px;
          border: 1px solid #cacaca;
          background-color: #fff;
          display: flex;
          margin-top: 17px;
          width: 100%;
          color: #000;
          flex-direction: column;
          justify-content: center;
          padding: 25px 23px;
        }
        @media (max-width: 1263px) {
          .div-29 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-30 {
          justify-content: space-between;
          display: flex;
          width: 100%;
          gap: 20px;
          padding: 0 1px;
        }
        @media (max-width: 1263px) {
          .div-30 {
            white-space: initial;
          }
        }
        .div-31 {
          align-self: start;
          display: flex;
          gap: 11px;
        }
        @media (max-width: 1263px) {
          .div-31 {
            white-space: initial;
          }
        }
        .img-8 {
          aspect-ratio: 1.05;
          object-fit: auto;
          object-position: center;
          width: 19px;
        }
        .div-32 {
          font-family: Poppins, sans-serif;
        }
        .img-9 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
        }
        .div-33 {
          border-radius: 20px;
          border: 1px solid #cacaca;
          background-color: #fff;
          display: flex;
          margin-top: 17px;
          width: 100%;
          color: #000;
          flex-direction: column;
          justify-content: center;
          padding: 25px 23px;
        }
        @media (max-width: 1263px) {
          .div-33 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-34 {
          justify-content: space-between;
          display: flex;
          width: 100%;
          gap: 20px;
          padding: 0 1px;
        }
        @media (max-width: 1263px) {
          .div-34 {
            white-space: initial;
          }
        }
        .div-35 {
          align-self: start;
          display: flex;
          gap: 11px;
        }
        @media (max-width: 1263px) {
          .div-35 {
            white-space: initial;
          }
        }
        .img-10 {
          aspect-ratio: 1.05;
          object-fit: auto;
          object-position: center;
          width: 19px;
        }
        .div-36 {
          font-family: Poppins, sans-serif;
          flex-grow: 1;
        }
        .img-11 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
        }
        .div-37 {
          border-radius: 20px;
          border: 1px solid #0ca851;
          background-color: #fff;
          display: flex;
          margin-top: 17px;
          width: 100%;
          color: #000;
          flex-direction: column;
          justify-content: center;
          padding: 25px 23px;
        }
        @media (max-width: 1263px) {
          .div-37 {
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-38 {
          justify-content: space-between;
          display: flex;
          width: 100%;
          gap: 20px;
          padding: 0 1px;
        }
        @media (max-width: 1263px) {
          .div-38 {
            white-space: initial;
          }
        }
        .div-39 {
          align-self: start;
          display: flex;
          gap: 11px;
        }
        @media (max-width: 1263px) {
          .div-39 {
            white-space: initial;
          }
        }
        .img-12 {
          aspect-ratio: 1.05;
          object-fit: auto;
          object-position: center;
          width: 19px;
        }
        .div-40 {
          font-family: Poppins, sans-serif;
        }
        .img-13 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 50%;
          margin-left: auto;
        }
        @media (max-width: 1263px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-41 {
          display: flex;
          margin-top: 35px;
          flex-grow: 1;
          flex-direction: column;
        }
        @media (max-width: 1263px) {
          .div-41 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-42 {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        @media (max-width: 1263px) {
          .div-42 {
            max-width: 100%;
          }
        }
        .div-43 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1263px) {
          .div-43 {
            max-width: 100%;
          }
        }
        .div-44 {
          color: #000;
          font: 22px/59% Poppins, sans-serif;
        }
        @media (max-width: 1263px) {
          .div-44 {
            max-width: 100%;
          }
        }
        .div-45 {
          color: #989898;
          margin-top: 12px;
          font: 17px/23px Poppins, sans-serif;
        }
        @media (max-width: 1263px) {
          .div-45 {
            max-width: 100%;
          }
        }
        .div-46 {
          border-radius: 8.357px;
          border: 1.045px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          margin-top: 12px;
          height: 54px;
        }
        @media (max-width: 1263px) {
          .div-46 {
            max-width: 100%;
          }
        }
        .div-47 {
          z-index: 10;
          display: flex;
          margin-top: 25px;
          flex-direction: column;
          font-size: 18px;
          color: #000;
          font-weight: 500;
        }
        @media (max-width: 1263px) {
          .div-47 {
            max-width: 100%;
          }
        }
        .div-48 {
          font-family: Poppins, sans-serif;
          justify-content: center;
        }
        @media (max-width: 1263px) {
          .div-48 {
            max-width: 100%;
          }
        }
        .div-49 {
          border-radius: 9.13px;
          border: 1.141px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          justify-content: center;
          white-space: nowrap;
          padding: 9px 19px;
        }
        @media (max-width: 1263px) {
          .div-49 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-50 {
          justify-content: center;
          display: flex;
          flex-direction: column;
          padding: 0 3px;
        }
        @media (max-width: 1263px) {
          .div-50 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-51 {
          justify-content: space-between;
          display: flex;
          gap: 20px;
          padding: 5px 1px;
        }
        @media (max-width: 1263px) {
          .div-51 {
            max-width: 100%;
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-52 {
          font-family: Poppins, sans-serif;
          color: #000;
        }
        .img-14 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
          margin: auto 0;
        }
        .div-53 {
          align-items: start;
          border-radius: 10px;
          border-right: 1px solid #b4b4b4;
          border-bottom: 1px solid #b4b4b4;
          border-left: 1px solid #b4b4b4;
          box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.17);
          background-color: #fff;
          display: flex;
          margin-top: -9px;
          flex-direction: column;
          justify-content: center;
          font-size: 13px;
          color: #959595;
          font-weight: 500;
          white-space: nowrap;
          padding: 17px 60px 17px 20px;
        }
        @media (max-width: 1263px) {
          .div-53 {
            max-width: 100%;
            padding-right: 20px;
            white-space: initial;
          }
        }
        .div-54 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1263px) {
          .div-54 {
            white-space: initial;
          }
        }

        .div-55,
        .div-56,
        .div-57 {
          color: #959595;
          margin: 5px;
        }

        .div-59 {
          font-family: Poppins, sans-serif;
          margin-top: 13px;
        }
        .div-60 {
          border-radius: 9.13px;
          border: 1.141px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          justify-content: center;
          white-space: nowrap;
          padding: 9px 19px;
        }
        @media (max-width: 1263px) {
          .div-60 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-61 {
          justify-content: center;
          display: flex;
          flex-direction: column;
          padding: 0 3px;
        }
        @media (max-width: 1263px) {
          .div-61 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-62 {
          justify-content: space-between;
          display: flex;
          gap: 20px;
          padding: 5px 1px;
        }
        @media (max-width: 1263px) {
          .div-62 {
            max-width: 100%;
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-63 {
          font-family: Poppins, sans-serif;
          color: #000;
        }
        .img-15 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
          margin: auto 0;
        }

        .div-64 {
          font-family: Poppins, sans-serif;
          justify-content: center;
          margin-top: 15px;
        }
        @media (max-width: 1263px) {
          .div-48 {
            max-width: 100%;
          }
        }
        .div-65 {
          border-radius: 9.13px;
          border: 1.141px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          justify-content: center;
          white-space: nowrap;
          padding: 9px 19px;
        }
        @media (max-width: 1263px) {
          .div-65 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-66 {
          justify-content: center;
          display: flex;
          flex-direction: column;
          padding: 0 3px;
        }
        @media (max-width: 1263px) {
          .div-66 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-67 {
          justify-content: space-between;
          display: flex;
          gap: 20px;
          padding: 5px 1px;
        }
        @media (max-width: 1263px) {
          .div-67 {
            max-width: 100%;
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-68 {
          font-family: Poppins, sans-serif;
          color: #000;
        }
        .img-16 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 20px;
          margin: auto 0;
        }

        .div-69 {
          display: flex;
          margin-top: 20px;
          flex-direction: column;
          color: #000;
          white-space: nowrap;
        }
        @media (max-width: 1263px) {
          .div-69 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-70 {
          justify-content: center;
          font: 500 18px Poppins, sans-serif;
        }
        @media (max-width: 1263px) {
          .div-70 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-71 {
          border-radius: 9.13px;
          border: 1.141px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          font-weight: 300;
          padding: 12px 19px;
        }
        @media (max-width: 1263px) {
          .div-71 {
            max-width: 100%;
            padding-right: 20px;
            white-space: initial;
          }
        }
        .div-72 {
          justify-content: space-between;
          display: flex;
          width: 100%;
          gap: 20px;
          padding: 0 1px;
        }
        @media (max-width: 1263px) {
          .div-72 {
            max-width: 100%;
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-73 {
          border-radius: 10px;
          background-color: #e6e6e6;
          display: flex;
          justify-content: space-between;
          gap: 5px;
          padding: 4px 13px;
        }
        @media (max-width: 1263px) {
          .div-73 {
            white-space: initial;
          }
        }
        .div-74 {
          font-family: Poppins, sans-serif;
          flex-grow: 1;
        }
        .img-15 {
          aspect-ratio: 0.93;
          object-fit: auto;
          object-position: center;
          width: 15px;
          margin: auto 0;
        }
        .img-16 {
          aspect-ratio: 2.22;
          object-fit: auto;
          object-position: center;
          width: 11px;
          stroke-width: 1.69px;
          stroke: #000;
          margin: auto 0;
        }
        .div-75 {
          display: flex;
          margin-top: 20px;
          flex-direction: column;
          font-size: 18px;
          white-space: nowrap;
        }
        @media (max-width: 1263px) {
          .div-75 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-76 {
          font-family: Poppins, sans-serif;
          justify-content: center;
          color: #000;
          font-weight: 500;
        }
        @media (max-width: 1263px) {
          .div-76 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-77 {
          border-radius: 9.13px;
          border: 1.141px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          margin-top: 9px;
          flex-direction: column;
          justify-content: center;
          color: #bebebe;
          font-weight: 300;
          padding: 9px 19px;
        }
        @media (max-width: 1263px) {
          .div-77 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-78 {
          justify-content: center;
          align-items: start;
          display: flex;
          padding-right: 60px;
          flex-direction: column;
        }
        @media (max-width: 1263px) {
          .div-78 {
            max-width: 100%;
            padding-right: 20px;
            white-space: initial;
          }
        }
        .div-79 {
          font-family: Poppins, sans-serif;
          justify-content: center;
          padding: 5px 0;
        }
        @media (max-width: 1263px) {
          .div-79 {
            white-space: initial;
          }
        }
        .div-80 {
          display: flex;
          margin-top: 20px;
          flex-direction: column;
          font-weight: 500;
        }
        @media (max-width: 1263px) {
          .div-80 {
            max-width: 100%;
          }
        }
        .div-81 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1263px) {
          .div-81 {
            max-width: 100%;
          }
        }
        .div-82 {
          justify-content: center;
          color: #000;
          white-space: nowrap;
          font: 18px Poppins, sans-serif;
        }
        @media (max-width: 1263px) {
          .div-82 {
            max-width: 100%;
            white-space: initial;
          }
        }
        .div-83 {
          color: #989898;
          letter-spacing: 0.5px;
          margin-top: 9px;
          font: 17px/136% Poppins, sans-serif;
        }
        @media (max-width: 1263px) {
          .div-83 {
            max-width: 100%;
          }
        }
        .div-84 {
          border-radius: 9.13px;
          border: 1.141px solid #4c4c4c;
          background-color: rgba(255, 255, 255, 0.2);
          margin-top: 10px;
          height: 281px;
        }
        @media (max-width: 1263px) {
          .div-84 {
            max-width: 100%;
          }
        }
        .div-85 {
          font-feature-settings: "clig" off, "liga" off;
          justify-content: center;
          border-radius: 6px;
          background-color: #28aa61;
          align-self: center;
          margin-top: 25px;
          color: var(--white-ffffff, #fff);
          white-space: nowrap;
          text-align: center;
          letter-spacing: 0.3px;
          padding: 10px 24px;
          font: 400 15px/133% Poppins, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 1263px) {
          .div-85 {
            white-space: initial;
            padding: 0 20px;
          }
        }

        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 25%;
          margin-left: 20px;
        }
        @media (max-width: 1263px) {
          .column-3 {
            width: 100%;
          }
        }

        .summary-container {
          border: 2px solid #0ca851;
          padding: 20px;
          border-radius: 10px;
          margin-top: 100px;
        }
        @media (max-width: 1263px) {
          .summary-container {
            white-space: initial;
            padding: 0 20px;
          }
        }

        .summary-header {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .tag {
          margin: 12px;
          font: 1em poppins;
          font-weight: bold;
        }
        .network {
          background-color: #0ca851;
          padding: 5px 10px;
          margin: 5px;
          border-radius: 5px;
        }
        .severity {
          background-color: #f0f0f0;
          padding: 5px 10px;
          margin: 5px;
          border-radius: 5px;
        }

        .contracts-header,
        .conditions-header,
        .alerts-header {
          font-weight: bold;
          margin-top: 10px;
        }

        .contract-address,
        .condition,
        .alert {
          padding: 5px 10px;
          border-radius: 5px;
          margin-top: 5px;
        }
        .alert-severity {
          background-color: #f0f0f0;
          margin-top: 5px;
          padding: 5px 10px;
        }
      `}</style>
    </>
  );
}
