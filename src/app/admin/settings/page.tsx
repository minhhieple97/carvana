import { SettingsPageContent } from '@/features/settings/components';

export default function SettingsPage() {
  return (
    <>
      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading font-semibold text-lg md:text-2xl text-foreground">
            Account Settings
          </h1>
        </div>
      </div>
      <SettingsPageContent />
    </>
  );
}
