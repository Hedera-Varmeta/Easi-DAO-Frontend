import { IProposal } from '@/api/proposal';
import Image from 'next/image'
import { Box, Divider, Skeleton } from '@mui/material';
import React, { FC, Suspense } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
    imageUrl?: string | null;
    description?: string;
}

const Description: FC<Props> = ({ imageUrl, description }) => {
    return (
        <Box sx={{
            width: "full",
            height: 'auto',
            padding: '5px 2px 2px 2px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}>
            {imageUrl && (<Box
                style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 300,
                    maxHeight: 800,
                    marginTop: 15,
                    borderRadius: 8,
                    border: 1,
                    position: 'relative',

                }}>
                <Suspense fallback={<Skeleton />}>
                    <Image
                        src={imageUrl}
                        alt=""
                        layout="responsive"
                        height="100"
                        width="100"
                        objectFit="contain"
                        style={{
                            borderRadius: 8,
                            border: 1,
                        }}
                    />
                </Suspense>
            </Box>)}
            {imageUrl && (<Divider />)}
            <Box >
                <ReactMarkdown>{description ?? ""}</ReactMarkdown>
            </Box>
        </Box>
    )
}

export default Description