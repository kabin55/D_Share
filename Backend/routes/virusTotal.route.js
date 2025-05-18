import multer from "multer";
import FormData from "form-data";

const virusTotalRouter = express.Router();

const upload = multer({ dest: "uploads/" });
const VirusTotal_API = process.env.VIRUSTOTAL_URL;

// Upload file and scan with VirusTotal
virusTotalRouter.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    // Prepare file for VirusTotal
    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path));

    // Send file to VirusTotal
    const response = await axios.post(VIRUSTOTAL_URL, form, {
      headers: {
        "x-apikey": process.env.VT_API_KEY,
        ...form.getHeaders(),
      },
    });

    // Cleanup: remove the uploaded file after scanning
    fs.unlinkSync(req.file.path);

    res.json({
      message: "File uploaded successfully",
      analysis: response.data,
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error scanning file with VirusTotal" });
  }
});

// Get scan report by analysis ID
virusTotalRouter.get("/report/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${req.params.id}`,
      {
        headers: { "x-apikey": process.env.VT_API_KEY },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching scan report" });
  }
});

export default virusTotalRouter;
