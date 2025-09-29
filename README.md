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

</div>

---

---

## 📸 Screenshots

<p align="center">
  <img src="/public/website/home.png" alt="Home Page" width="600" />
</p>

### Authentication

- **Login**
  ![Login](/public/website/login.png)
- **Profile**
  ![Profile](/public/website/profile.png)

### Exams

- **Exam List**
  ![Exam](/public/website/exam.png)
- **Exam Form**
  ![Exam Form](/public/website/examForm.png)
- **Question Form**
  ![Question Form](/public/website/questionForm.png)
- **Sections & Questions**
  ![Sections and Questions](/public/website/SectionsAndQuestions.png)

### Students

- **Student List**
  ![Student](/public/website/student.png)
- **Student Form**
  ![Student Form](/public/website/studentForm.png)

### Teachers

- **Teacher List**
  ![Teacher](/public/website/teacher.png)
- **Teacher Form**
  ![Teacher Form](/public/website/teacherForm.png)
- **Teacher Assignment**
  ![Teacher Assignment](/public/website/teacherAssignment.png)
- **Teacher Assignment Form**
  ![Teacher Assignment Form](/public/website/teacherAssignmentForm.png)

### Schools

- **School List**
  ![School](/public/website/school.png)
- **School Admins**
  ![School Admins](/public/website/schoolAdmins.png)
- **School Form**
  ![School Form](/public/website/schoolForm.png)
- **School Admin Form**
  ![School Admin Form](/public/website/schoolAdminForm.png)

### Subjects

- **Subject List**
  ![Subject](/public/website/subject.png)
- **Subject Form**
  ![Subject Form](/public/website/subjectForm.png)

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
