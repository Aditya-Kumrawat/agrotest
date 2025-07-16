ere's a complete Replit prompt you can paste into your .replit or README to help any developer (or even your future self) understand:

🛠️ Replit Dev Setup Prompt for AgroSaarthi Backend with Firebase
✅ This guide helps fix TypeScript custom req.user typing issues, build the backend, and explains Firebase structure integration.

📁 Project Structure (Post-Migration to Firebase)
arduino
Copy
Edit
/server
│
├── src/
│   ├── routes/
│   │   ├── crops.ts
│   │   └── ...
│   ├── middleware/
│   │   └── auth.ts     // Verifies Firebase token and injects req.user
│   ├── types/
│   │   └── express/index.d.ts  ✅ Custom typing for req.user
│   └── index.ts        // Express app entry
├── tsconfig.json        ✅ Type-safe Firebase + Express setup
├── .replit
├── package.json
└── ...
✅ Setup Instructions
Install all dependencies

bash
Copy
Edit
npm install
Fix req.user TypeScript Errors

Replit/TypeScript doesn’t know req.user exists, so we add a global type declaration.

🔧 Create: src/types/express/index.d.ts
ts
Copy
Edit
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export {};
Ensure tsconfig.json has typeRoots:

json
Copy
Edit
{
  "compilerOptions": {
    ...
    "typeRoots": ["./node_modules/@types", "./src/types"]
  }
}
🔒 Firebase Auth Integration
We're using Firebase to replace MySQL for Auth & Data.

🔑 Firebase Setup
In middleware/auth.ts, we use Firebase Admin SDK:

ts
Copy
Edit
import admin from "firebase-admin";

// initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "<your_project_id>",
    clientEmail: "<your_client_email>",
    privateKey: "<your_private_key>".replace(/\\n/g, "\n"),
  }),
});

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      id: decoded.uid,
      email: decoded.email || "",
      name: decoded.name || "User",
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
🧠 Firebase Collections Structure (Firestore)
yaml
Copy
Edit
📂 users
   └── {uid}
       ├── name: string
       └── email: string

📂 scans
   └── {scanId}
       ├── userId: uid
       ├── crop: string
       ├── isHealthy: boolean
       ├── diseaseDetected: string
       ├── confidence: number
       └── timestamp: Date

📂 communityPosts
   └── {postId}
       ├── userId: uid
       ├── content: string
       └── comments: [ ... ]

📂 analytics / dashboard / forecast
   └── ...custom logic depending on project scope
🛠 Build and Run Project
bash
Copy
Edit
npm run build     # compiles to /dist
npm start         # runs node dist/index.js
🧪 Example Protected Route Usage (with req.user)
ts
Copy
Edit
router.get("/profile", authenticateUser, (req, res) => {
  const { id, email, name } = req.user!;
  res.json({ id, email, name });
});
🐞 Common Errors Fixed
Error	Fix
TS2769: req.user not found	Fixed by express/index.d.ts global type
TS2451: redeclare id/email	Don't destructure twice
MODULE_NOT_FOUND dist/index.js	Run npm run build before start

Let me know if you want a downloadable .zip Replit starter template with this whole structure built-in.