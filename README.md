<div align="center">

# Exam 🚀

<p>A Next.js 15 project using <b>Turbopack</b> for fast builds and modern tooling. <br /> Includes a rich set of UI components, form handling, validation, and state management.</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Turbopack-▲-orange?style=for-the-badge&logo=vercel&logoColor=white" alt="Turbopack" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Zustand-🐻-green?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/React_Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query v5" />
  <img src="https://img.shields.io/badge/React_Hook_Form-v7-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Zod-validation-blue?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
</p>

**👉 [Live Demo](https://exam-site-digitopia.vercel.app/login)**

</div>

---

## 📸 Screenshots

### Authentication

<table>
  <tr>
    <td align="center">
      <img src="/public/website/login.png" alt="Login" width="250"/><br/>Login
    </td>
    <td align="center">
      <img src="/public/website/profile.png" alt="Profile" width="250"/><br/>Profile
    </td>
    <td align="center">
      <img src="/public/website/home.png" alt="Home" width="250"/><br/>Home
    </td>
  </tr>
</table>

### Exams

<table>
  <tr>
    <td align="center">
      <img src="/public/website/exam.png" alt="Exam" width="250"/><br/>Exam
    </td>
    <td align="center">
      <img src="/public/website/examForm.png" alt="Exam Form" width="250"/><br/>Exam Form
    </td>
    <td align="center">
      <img src="/public/website/questionForm.png" alt="Question Form" width="250"/><br/>Question Form
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/public/website/SectionsAndQuestions.png" alt="Sections and Questions" width="250"/><br/>Sections & Questions
    </td>
  </tr>
</table>

### Students

<table>
  <tr>
    <td align="center">
      <img src="/public/website/student.png" alt="Student" width="250"/><br/>Student
    </td>
    <td align="center">
      <img src="/public/website/studentForm.png" alt="Student Form" width="250"/><br/>Student Form
    </td>
  </tr>
</table>

### Teachers

<table>
  <tr>
    <td align="center">
      <img src="/public/website/teacher.png" alt="Teacher" width="250"/><br/>Teacher
    </td>
    <td align="center">
      <img src="/public/website/teacherForm.png" alt="Teacher Form" width="250"/><br/>Teacher Form
    </td>
    <td align="center">
      <img src="/public/website/teacherAssignment.png" alt="Teacher Assignment" width="250"/><br/>Teacher Assignment
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/public/website/teacherAssignmentForm.png" alt="Teacher Assignment Form" width="250"/><br/>Teacher Assignment Form
    </td>
  </tr>
</table>

### Schools

<table>
  <tr>
    <td align="center">
      <img src="/public/website/school.png" alt="School" width="250"/><br/>School
    </td>
    <td align="center">
      <img src="/public/website/schoolForm.png" alt="School Form" width="250"/><br/>School Form
    </td>
    <td align="center">
      <img src="/public/website/schoolAdmins.png" alt="School Admins" width="250"/><br/>School Admins
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/public/website/schoolAdminForm.png" alt="School Admin Form" width="250"/><br/>School Admin Form
    </td>
  </tr>
</table>

### Subjects

<table>
  <tr>
    <td align="center">
      <img src="/public/website/subject.png" alt="Subject" width="250"/><br/>Subject
    </td>
    <td align="center">
      <img src="/public/website/subjectForm.png" alt="Subject Form" width="250"/><br/>Subject Form
    </td>
  </tr>
</table>

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd exam-site
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **UI Components**: Radix UI, Lucide Icons, Framer Motion
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query + Axios
- **Styling**: Tailwind CSS v4, `tailwind-merge`, `tw-animate-css`
- **Rich Text Editor**: CKEditor 5
- **Utilities**: `clsx`, `class-variance-authority`, `js-cookie`, `react-hot-toast`

---

## 📂 Scripts

- `npm run dev` → Start development server with **Turbopack**.
- `npm run build` → Build the production-ready bundle.
- `npm start` → Run the production server.

---

## ⚙️ Development Setup

- **TypeScript**: `v5`
- **Node.js types**: `v20`
- **React types**: `v19`
- **Tailwind/PostCSS**: `v4`

---

## 📂 Folder Structure

```
src
├── app/          # App Router pages and layouts
├── components/   # Shared components
│   ├── ui/       # Primitives like Button, Input, etc.
│   ├── forms/    # Form-specific components
│   └── layout/   # Layout components (Navbar, Footer)
├── lib/          # Utilities and core logic
│   ├── api.ts    # API fetching logic
│   ├── utils.ts  # General helper functions
│   └── validators/ # Zod schemas
├── hooks/        # Custom React hooks
├── store/        # Zustand state management stores
└── styles/       # Global styles
```

---

## 🛠️ Usage Example

### Using a UI Component

```tsx
import { Button } from "@/components/ui/Button";

export default function Home() {
  return <Button>Click me</Button>;
}
```

### Form Validation with React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 📜 License

This project is licensed under the **MIT** License.
