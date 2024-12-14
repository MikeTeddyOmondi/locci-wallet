import { SimpleForm } from "@/components/Form/SimpleForm";
// import { UploadForm } from "@/components/Form/UploadForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";

export default function Form() {
  return (
    <PageContainer title="Forms">
      <SimpleForm />
      {/* <UploadForm /> */}
    </PageContainer>
  );
}
