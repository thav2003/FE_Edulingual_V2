/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'

import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Autosave } from '@ckeditor/ckeditor5-autosave'
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services'
import type { EditorConfig } from '@ckeditor/ckeditor5-core'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font'
import { Heading, Title } from '@ckeditor/ckeditor5-heading'
import { Highlight } from '@ckeditor/ckeditor5-highlight'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support'
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload
} from '@ckeditor/ckeditor5-image'
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent'
import { TextPartLanguage } from '@ckeditor/ckeditor5-language'
import { AutoLink, Link } from '@ckeditor/ckeditor5-link'
import { List, ListProperties } from '@ckeditor/ckeditor5-list'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import { SelectAll } from '@ckeditor/ckeditor5-select-all'
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText
} from '@ckeditor/ckeditor5-special-characters'
import { Style } from '@ckeditor/ckeditor5-style'
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar
} from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { AccessibilityHelp } from '@ckeditor/ckeditor5-ui'
import { Undo } from '@ckeditor/ckeditor5-undo'
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload'
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog'
import { WordCount } from '@ckeditor/ckeditor5-word-count'

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    AccessibilityHelp,
    Alignment,
    AutoImage,
    AutoLink,
    Autoformat,
    Autosave,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Style,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    Title,
    Underline,
    Undo,
    WordCount
  ]

  public static override defaultConfig: EditorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'fontFamily',
        'fontSize',
        'fontColor',
        'bold',
        'underline',
        'italic',
        'link',
        'alignment',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        '|',
        'highlight',
        'specialCharacters',
        'horizontalLine',
        'imageUpload',
        '|',
        'imageInsert',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        '|',
        'accessibilityHelp',
        'style',
        'textPartLanguage'
      ]
    },
    language: 'vi',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    }
  }
}

export default { Editor, EditorWatchdog }
