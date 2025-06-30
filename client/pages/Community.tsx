import Layout from "@/components/Layout";

export default function Community() {
  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-agro-text-primary mb-4">
            Community
          </h1>
          <p className="text-agro-text-muted mb-8">
            Connect with other farmers and share knowledge.
          </p>
          <div className="agro-card max-w-md mx-auto">
            <p className="text-agro-text-primary">
              Community features coming soon! Join discussions, share tips, and
              learn from fellow farmers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
