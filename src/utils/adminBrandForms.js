import {
  alignItems,
  flexFlow,
  justifyContent,
  textAlign,
} from './fieldOptions'

const adminBrandForms = [{
  name: 'appBar',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'fontFamily', type: 'text' },
    { name: 'fontSize', type: 'text' },
    { name: 'fontWeight', type: 'text' },
    { name: 'imageBorderRadius', type: 'text' },
    { name: 'imageElevation', type: 'number', max: 24, min: 0 },
    { name: 'imagePosition', type: 'select', options: [ 'absolute', 'relative' ]},
    { name: 'imageWidth', type: 'text' },
    { name: 'letterSpacing', type: 'text' },
    { name: 'phoneSize', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'navColor', type: 'text' },
    { name: 'showPhone', type: 'select', options: [ 'true', 'false' ] },
    { name: 'textShadow', type: 'text' }
  ]
}, {
  name: 'articleStyle',
  fields: [
    { name: 'button1BackgroundColor', type: 'text' },
    { name: 'button2BackgroundColor', type: 'text' },
    { name: 'button1Border', type: 'text' },
    { name: 'button2Border', type: 'text' },
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'h1Align', type: 'select', options: textAlign },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: textAlign  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: textAlign  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
    { name: 'pColor', type: 'text' },
    { name: 'mediaBorder', type: 'text' },
    { name: 'imageElevation', type: 'number', max: 24, min: 0 },
  ]
}, {
  name: 'body',
  fields: [
    { name: 'backgroundColor', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
  ]
}, {
  name: 'business',
  fields: [
    { name: 'city', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'googleAnalyticsUA', type: 'text' },
    { name: 'imageBorderRadius', type: 'text' },
    { name: 'keywords', type: 'text' },
    { name: 'license', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'phone', type: 'phone' },
    { name: 'phoneStyle', type: 'select', options: [ '(###) ###-####', '###.###.####' ] },
    { name: 'state', type: 'state' },
    { name: 'street', type: 'text' },
    { name: 'stripePkLive', type: 'text' },
    { name: 'stripePkTest', type: 'text' },
    { name: 'zip', type: 'zip' },
  ]
}, {
  name: 'cardStyle',
  fields: [
    { name: 'button1BackgroundColor', type: 'text' },
    { name: 'button2BackgroundColor', type: 'text' },
    { name: 'button1Border', type: 'text' },
    { name: 'button2Border', type: 'text' },
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'elevation', type: 'number', max: 24, min: 0 },
    { name: 'flex', type: 'text' },
    { name: 'h1Align', type: 'select', options: textAlign  },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'select', options: textAlign  },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'select', options: textAlign  },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
    { name: 'pColor', type: 'text' },
    { name: 'margin', type: 'text' },
    { name: 'mediaBorder', type: 'text' }
  ]
}, {
  name: 'footer',
  fields: [
    { name: 'alignItems', type: 'select', options: alignItems },
    { name: 'backgroundColor', type: 'text' },
    { name: 'backgroundPosition', type: 'text' },
    { name: 'borderBottom', type: 'text' },
    { name: 'borderTop', type: 'text' },
    { name: 'boxShadow', type: 'text' },
    { name: 'color', type: 'text' },
    { name: 'flexFlow', type: 'select', options: flexFlow },
    { name: 'imageBorderRadius', type: 'text' },
    { name: 'imageElevation', type: 'number', max: 24, min: 0 },
    { name: 'imageMargin', type: 'text' },
    { name: 'imagePadding', type: 'text' },
    { name: 'justifyContent', type: 'select', options: justifyContent },
    { name: 'textAlignItems', type: 'select', options: alignItems },
  ]
}, {
  name: 'heroStyle',
  fields: [
    { name: 'alignItems', type: 'select', options: alignItems },
    { name: 'button1BackgroundColor', type: 'text' },
    { name: 'button2BackgroundColor', type: 'text' },
    { name: 'button1Border', type: 'text' },
    { name: 'button2Border', type: 'text' },
    { name: 'button1Color', type: 'text' },
    { name: 'button2Color', type: 'text' },
    { name: 'button1BorderColor', type: 'text' },
    { name: 'button2BorderColor', type: 'text' },
    { name: 'h1Align', type: 'text' },
    { name: 'h1Color', type: 'text' },
    { name: 'h1TextShadow', type: 'text' },
    { name: 'h2Align', type: 'text' },
    { name: 'h2Color', type: 'text' },
    { name: 'h2TextShadow', type: 'text' },
    { name: 'h3Align', type: 'text' },
    { name: 'h3Color', type: 'text' },
    { name: 'h3TextShadow', type: 'text' },
    { name: 'pColor', type: 'text' },
    { name: 'minHeight', type: 'text' }
  ]
}, {
  name: 'palette',
  fields: [
    { name: 'primary1Color', type: 'text' },
    { name: 'primary2Color', type: 'text' },
    { name: 'primary3Color', type: 'text' },
    { name: 'accent1Color', type: 'text' },
    { name: 'accent2Color', type: 'text' },
    { name: 'accent3Color', type: 'text' },
    { name: 'textColor', type: 'text' },
    { name: 'secondaryTextColor', type: 'text' },
    { name: 'alternateTextColor', type: 'text' },
    { name: 'canvasColor', type: 'text' },
    { name: 'borderColor', type: 'text' },
    { name: 'disabledColor', type: 'text' },
    { name: 'pickerHeaderColor', type: 'text' },
    { name: 'shadowColor', type: 'text' }
  ]
}, {
  name: 'productStyle',
  fields: [
    { name: 'descriptionColor', type: 'text' },
    { name: 'detailColor', type: 'text' },
    { name: 'detailPageBackgroundColor', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'margin', type: 'text' },
    { name: 'mediaElevation', type: 'number', max: 24, min: 0 },
    { name: 'nameColor', type: 'text' },
    { name: 'nameTextShadow', type: 'text' },
  ]
}, {
  name: 'socialMedia',
  fields: [
    { name: 'facebook', type: 'text' },
    { name: 'github', type: 'text' },
    { name: 'googleplus', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'twitter', type: 'text' },
    { name: 'yelp', type: 'text' },
    { name: 'youtube', type: 'text' },
  ]
}, {
  name: 'typography',
  fields: [
    { name: 'fontFamily', type: 'text' },
    { name: 'fontWeight', type: 'text' },
    { name: 'h1FontFamily', type: 'text' },
    { name: 'h1FontSize', type: 'text' },
    { name: 'h1LetterSpacing', type: 'text' },
    { name: 'h2FontFamily', type: 'text' },
    { name: 'h2FontSize', type: 'text' },
    { name: 'h2LetterSpacing', type: 'text' },
    { name: 'h3FontFamily', type: 'text' },
    { name: 'h3FontSize', type: 'text' },
    { name: 'h3LetterSpacing', type: 'text' },
    { name: 'lineHeight', type: 'text' },
    { name: 'pFontFamily', type: 'text' },
    { name: 'pFontSize', type: 'text' },
    { name: 'pLetterSpacing', type: 'text' },
  ]
}]

export default adminBrandForms
