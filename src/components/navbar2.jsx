import * as React from "react";

export default function Navbar2({ email }) {
  return (
    <>
      <div className="div-3">
        <div className="div-4">
          <div className="div-5" />
          <div className="div-6">SecureWatch</div>
        </div>
        <div className="div-7">
          <div className="div-8">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d58fb628934d90937b358a69cc3950ef1f7aecd108c71502de9adb5ea0179a13?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
              className="img-2"
            />
            <div className="div-9">Overview</div>
          </div>
          <div className="div-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/735991d9a777b7b128a74b2a9b14fa03b40c8bce28740745900649b767dbf411?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
              className="img-3"
            />
            <div className="div-11">Monitor</div>
          </div>
          <div className="div-12">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa59e5b603947d22bced57a442eadfeb177f2d7a78de43f8bc921ac57fd11391?apiKey=81130fff99a04bb0ab44e20c5639d57c&"
              className="img-4"
            />
            <div className="div-13">Logs</div>
          </div>
        </div>
        <div className="div-14">
          <div className="div-15">{email}</div>
        </div>
      </div>
      <style jsx>{`
        .div-3 {
          position: relative;
          border-radius: 25.412px;
          border: 1.059px solid #505050;
          background-color: rgba(48, 48, 48, 0.97);
          align-self: center;
          display: flex;
          margin-top: 21px;
          width: 772px;
          max-width: 100%;
          justify-content: space-between;
          gap: 20px;
          font-weight: 600;
          white-space: nowrap;
          letter-spacing: -0.07px;
          padding: 12px 13px;
        }
        @media (max-width: 991px) {
          .div-3 {
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-4 {
          align-self: start;
          display: flex;
          gap: 10px;
          font-size: 17px;
          color: #fff;
          line-height: 114%;
        }
        @media (max-width: 991px) {
          .div-4 {
            white-space: initial;
          }
        }
        .div-5 {
          background-color: #107f41;
          border-radius: 50%;
          width: 35px;
          height: 34px;
        }
        .div-6 {
          font-family: Poppins, sans-serif;
          flex-grow: 1;
          margin: auto 0;
        }
        .div-7 {
          display: flex;
          gap: 17px;
          font-size: 13px;
          color: #fff2f2;
          font-weight: 400;
          letter-spacing: -0.08px;
          line-height: 161%;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-7 {
            white-space: initial;
          }
        }
        .div-8 {
          justify-content: space-between;
          display: flex;
          gap: 7px;
        }
        @media (max-width: 991px) {
          .div-8 {
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
        .div-9 {
          font-family: Inter, sans-serif;
          flex-grow: 1;
        }
        .div-10 {
          display: flex;
          justify-content: space-between;
          gap: 7px;
        }
        @media (max-width: 991px) {
          .div-10 {
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
        .div-11 {
          font-family: Inter, sans-serif;
          flex-grow: 1;
        }
        .div-12 {
          display: flex;
          justify-content: space-between;
          gap: 6px;
        }
        @media (max-width: 991px) {
          .div-12 {
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
        .div-13 {
          font-family: Inter, sans-serif;
        }
        .div-14 {
          display: flex;
          flex-grow: 1;
          flex-basis: 0%;
          flex-direction: column;
          justify-content: center;
          font-size: 15px;
          color: #000;
          line-height: 130%;
        }
        @media (max-width: 991px) {
          .div-14 {
            white-space: initial;
          }
        }
        .div-15 {
          font-family: Poppins, sans-serif;
          justify-content: center;
          border-radius: 21.144px;
          background-color: #fff;
          padding: 8px 13px;
        }
        @media (max-width: 991px) {
          .div-15 {
            white-space: initial;
          }
        }
      `}</style>
    </>
  );
}
