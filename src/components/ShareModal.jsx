import { toast } from "react-hot-toast";
import { shareHandler } from "../backend/utils/shareHandler";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";

export const ShareModal = ({ setShowShare, id }) => {
  return (
    <>
      <div className="show-following-container-layout">
        <div className="modal-content">
          <div>
            Share Your Post
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "3.2rem",
                marginTop: "1rem",
                justifyContent: "space-between",
              }}
            >
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://echo-sphere.vercel.app/post/${id}`
                  );
                  toast.success("Link Copied ! Start Sharing");
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src="https://cdn-icons-png.flaticon.com/512/8767/8767851.png"
                  width="68rem"
                  height="68rem"
                  alt="copylink"
                />
              </div>
              <div
                onClick={() => {
                  shareHandler(id);
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src="https://ps.w.org/bp-activity-social-share/assets/icon-256x256.png?rev=2472425"
                  width="68rem"
                  height="68rem"
                  alt="copylink"
                />
              </div>
              <div>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={`https://api.whatsapp.com/send?text=https://echo-sphere.vercel.app/post/${id}`}
                  data-action="share/whatsapp/share"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
                    width="68rem"
                    height="68rem"
                    alt="copylink"
                  />
                </a>
              </div>
              <div>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={`https://twitter.com/intent/tweet?text=https://echo-sphere.vercel.app/post/${id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png"
                    width="68rem"
                    height="68rem"
                    alt="copylink"
                  />
                </a>
              </div>
              <div>
                <FacebookShareButton
                  url={`https://echo-sphere.vercel.app/post/${id}`}
                  quote={"Check this post now"}
                  hashtag="#echosphere"
                >
                  <FacebookIcon
                    logoFillColor="white"
                    round={true}
                  ></FacebookIcon>
                </FacebookShareButton>
              </div>

              <div>
                <TelegramShareButton
                  url={`https://echo-sphere.vercel.app/post/${id}`}
                  quote={"Check this post now"}
                >
                  <TelegramIcon
                    logoFillColor="white"
                    round={true}
                  ></TelegramIcon>
                </TelegramShareButton>
              </div>
            </div>
          </div>

          <div
            className="modal-cross"
            onClick={() => {
              setShowShare((showShare) => ({ ...showShare, show: false }));
            }}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
};
