'use client';

import { Editor, type InitOptions } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import { useFormContext } from 'react-hook-form';
import { useTheme } from 'next-themes';

import { FormLabel } from '@/components/ui';
import { env } from '@/env';

import type { IAllProps } from '@tinymce/tinymce-react';

type TextEditorProps = {
  name: string;
  label?: string;
  config?: IAllProps;
};

export const RichTextEditor = (props: TextEditorProps) => {
  const { name, label, config } = props;
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const init: InitOptions = {
    height: 200,
    skin: 'oxide-dark',
    content_css: 'dark',
    icons: 'small',
    resize: false,
    menubar: false,
    branding: false,
    convert_urls: true,
    wordcount: true,
    elementpath: true,
    importcss_append: true,
    browser_spellcheck: true,
    highlight_on_focus: true,
    newline_behavior: 'linebreak',
    forced_root_block: 'p',
    plugins: ['lists', 'link', 'wordcount', 'importcss', 'media'],
    valid_elements: 'p,a[href|rel|target],strong/b,em/i,u,strike,br,ul,ol,li',
    toolbar: 'undo redo | styles | formatselect bold italic | bullist numlist | link',

    link_default_target: '_blank',
    link_assume_external_targets: true,
    autolink_pattern: /^(https?:\/\/|www\.)(.+)$/i,

    paste_postprocess: (_plugin: any, args: any) => {
      const links = args.node.getElementsByTagName('a');
      for (let i = 0; i < links.length; i++) {
        links[i].style.color = '#93c5fd';
        links[i].style.textDecoration = 'underline';
      }
    },
    content_style: `
        body {
            font-family: var(--font-body, ui-sans-serif, system-ui, sans-serif);
            color: hsl(210 40% 98%);
            background-color: hsl(217 33% 17%);
            padding: 0.75rem;
            border-radius: 0.375rem;
        }
        a {
            color: #93c5fd;
            text-decoration: underline;
            cursor: pointer;
        }
        a:hover {
            color: #60a5fa;
        }
        p {
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        ul, ol {
            margin-left: 1rem;
        }
    `,
    ...(config?.init && { ...config.init }),
  };

  const form = useFormContext();
  const value = form.watch(name);

  const handleEditorChange = (content: string) => {
    form.setValue(name, content);
  };

  return (
    <div className="space-y-2">
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <div className="border border-input rounded-md overflow-hidden shadow-sm bg-muted">
        <Editor
          {...props.config}
          init={init}
          value={value}
          apiKey={env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
};
