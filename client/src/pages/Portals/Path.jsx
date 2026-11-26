import { GraduationCap, ShieldCheck } from "lucide-react";
import Button from "../../components/Buttons/Button";
import PageLayout from "../../components/Layout/PageLayout";
import PageHeader from "../../components/Layout/PageHeader";
import PageCard from "../../components/Layout/PageCard";

const Path = () => {
  return (
    <PageLayout>

      <PageHeader
        title="Welcome to Notes Store"
        description="Choose how you want to continue."
      />

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12 w-full">

        {/* Student Card */}
        <PageCard className="max-w-96 mx-auto md:mx-0 hover:bg-purple-900">

          <GraduationCap
            size={48}
            strokeWidth={1.5}
            className="text-purple-300"
          />

          <h2 className="text-3xl font-bold text-white">Student</h2>

          <p className="text-gray-300">
            Access and download verified study materials uploaded by administrators.
          </p>

          <div className="mt-auto">
            <Button
              label="Browse Study Materials"
              to="/student"
              param={{ role: "student" }}
            />
          </div>

        </PageCard>

        {/* Admin Card */}
        <PageCard className="max-w-96 mx-auto md:mx-0 hover:bg-purple-900">

          <ShieldCheck
            size={48}
            strokeWidth={1.5}
            className="text-purple-300"
          />

          <h2 className="text-3xl font-bold text-white">Admin</h2>

          <p className="text-gray-300">
            Upload and manage study materials for students in a secure repository.
          </p>

          <div className="mt-auto">
            <Button
              label="Login as Admin"
              to="/admin-login"
              param={{ role: "admin" }}
            />
          </div>

        </PageCard>

      </div>

    </PageLayout>
  );
};

export default Path;