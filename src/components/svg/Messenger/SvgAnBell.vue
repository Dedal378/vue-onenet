<template>
  <svg
    class="svgAnBell"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <path
        d="M42.4765 4C42.939 3.99938 43.397 4.08993 43.8245 4.26648C44.252 4.44304 44.6404 4.70213 44.9677 5.02894C45.2949 5.35576 45.5546 5.74388 45.7317 6.1711C45.9088 6.59833 46 7.05629 46 7.51878V33.6719C46 34.1344 45.9088 34.5924 45.7317 35.0196C45.5546 35.4468 45.2949 35.8349 44.9677 36.1617C44.6404 36.4886 44.252 36.7476 43.8245 36.9242C43.397 37.1008 42.939 37.1913 42.4765 37.1907H21.7822L14.5 43.5L15.0347 37.1907H9.64241C9.18032 37.1907 8.72275 37.0997 8.29583 36.9228C7.86892 36.746 7.48101 36.4868 7.15426 36.1601C6.82751 35.8333 6.56832 35.4454 6.39148 35.0185C6.21465 34.5916 6.12363 34.134 6.12363 33.6719V7.51878C6.12363 7.05669 6.21465 6.59913 6.39148 6.17221C6.56832 5.74529 6.82751 5.35738 7.15426 5.03063C7.48101 4.70388 7.86892 4.44469 8.29583 4.26786C8.72275 4.09102 9.18032 4 9.64241 4H42.4765Z"
        fill="url(#paint0_linear)"
      />
    </g>
    <g class="svgAnBell-bell">
      <path
        d="M33.8849 18.8063C33.4473 18.8063 33.0924 18.4514 33.0924 18.0138C33.0924 15.7908 32.2269 13.7018 30.6553 12.1293C30.3455 11.8195 30.3455 11.3187 30.6553 11.0087C30.9652 10.6989 31.4661 10.6989 31.7759 11.0087C33.6472 12.8798 34.6773 15.3677 34.6773 18.0138C34.6773 18.4514 34.3224 18.8063 33.8849 18.8063Z"
        fill="white"
      />
      <path
        d="M18.0339 18.8063C17.5966 18.8063 17.2415 18.4514 17.2415 18.0138C17.2415 15.3677 18.2718 12.8798 20.1429 11.0087C20.4527 10.6989 20.9536 10.6989 21.2634 11.0087C21.5734 11.3187 21.5734 11.8195 21.2634 12.1293C19.6919 13.7009 18.8265 15.7908 18.8265 18.0138C18.8265 18.4514 18.4714 18.8063 18.0339 18.8063Z"
        fill="white"
      />
      <path
        d="M33.3925 23.5856C32.1942 22.5727 31.507 21.0922 31.507 19.5238V17.3143C31.507 14.5255 29.4354 12.2169 26.7519 11.8301V10.9741C26.7519 10.5359 26.3968 10.1816 25.9595 10.1816C25.5219 10.1816 25.1668 10.5359 25.1668 10.9741V11.8301C22.4827 12.2169 20.4117 14.5255 20.4117 17.3143V19.5238C20.4117 21.0922 19.7246 22.5727 18.5193 23.5918C18.2109 23.8558 18.0342 24.2393 18.0342 24.6451C18.0342 25.41 18.6563 26.0321 19.4212 26.0321H32.4977C33.2625 26.0321 33.8846 25.41 33.8846 24.6451C33.8846 24.2393 33.7079 23.8558 33.3925 23.5856Z"
        fill="white"
      />
      <path
        d="M25.9587 29.2018C27.3939 29.2018 28.5946 28.1786 28.8704 26.8242H23.047C23.3227 28.1786 24.5234 29.2018 25.9587 29.2018Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0.123657"
        y="0"
        width="51.8763"
        height="51.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="36.6476"
        y1="5.42526"
        x2="23.2041"
        y2="43.3744"
        gradientUnits="userSpaceOnUse"
      >
        <stop style="stop-color: var(--first-color)" />
        <stop style="stop-color: var(--second-color)" offset="1" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style lang="stylus">
.svgAnBell
  margin-top 5px

.svgAnBell-bell
  animation-name bell
  animation-duration 2s
  animation-iteration-count infinite
  animation-direction alternate
  transform-origin: center 10px;
  @keyframes bell {
    0% {
      transform rotate(-15deg)
    }
    10% {
      transform rotate(15deg)
    }
    20% {
      transform rotate(-15deg)
    }
    30% {
      transform rotate(15deg)
    }
    40% {
      transform rotate(-15deg)
    }
    50% {
      transform rotate(0deg)
    }
    100% {
      transform rotate(0deg)
    }
  }
</style>
