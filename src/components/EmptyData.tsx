import { useTranslations } from 'next-intl';
import Image from 'next/image';

function EmptyData({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}): React.ReactElement {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="object-cover w-48 h-48">
        <Image width={500} height={500} alt="" src={'/empty.png'} />
      </div>
      <h4 className="text-lg font-bold">{title || t('emptyData.title')}</h4>
      <div className="text-slate-400">
        {subtitle || t('emptyData.subtitle')}
      </div>
    </div>
  );
}

export default EmptyData;
