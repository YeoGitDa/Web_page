import React from 'react';
import { SiteHeader, PageHead } from './SiteHeader';

const ArchivingDetail = () => {

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader suffix="Archiving" />
      <PageHead eyebrow="ARCHIVING" title="디지털 아카이빙" desc="여백과 전공 동아리의 활동 기록을 모으는 곳입니다. 지금은 준비 중이에요." />

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-20 px-5">
        <div className="text-center">
          <img
            src="/backend/image/wait.png"
            alt="Coming Soon"
            className="mx-auto max-w-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ArchivingDetail;


