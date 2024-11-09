import { store } from '@/store';
import ProviderWrapper from '@/hooks';
import NotFoundContent from '@/views/404';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export default async function NotFound() {
    const messages = await getMessages();
    const locale = store.getState().language.locale;
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <ProviderWrapper>
                <NotFoundContent />
            </ProviderWrapper>
        </NextIntlClientProvider>
    );
};