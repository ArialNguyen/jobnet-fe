import type { Metadata } from 'next';
import '@/app/globals.css';
import { headers } from 'next/headers';
import Footer from '@/components/Footer';
import RHeadder from '@/components/header/RHeader';
import ProviderLayout from '@/components/layout/ProviderLayout';
import RcSidebar from '@/components/sidebar/RcSidebar';

export const metadata: Metadata = {
    title: 'Recruiter Home',
    description: 'Recruiter Home page',
};

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'vi' }];
}

type Props = Readonly<{
    children: React.ReactNode;
    params: { lang: string };
}>;
export default async function Layout({ children, params }: Props) {
    const head = await headers()
    const pathname = head.get("x-pathname")!!
    let isUseHeader = true
    if (pathname.includes("view-resume")) {
        isUseHeader = false
    }
    
    return (
        // eslint-disable-next-line react/no-children-prop
        <ProviderLayout children={
            (<div>
                {(isUseHeader == true) ? (
                    <div>
                        <RHeadder />
                        {children}
                    </div>
                ) : (
                    <div>{children} </div>
                )}
                <Footer />
            </div>)
        } params={params} />
    );
}