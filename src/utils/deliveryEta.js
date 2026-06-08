// States reachable within 3 business days from Kashmir/J&K
const FAST_STATES = new Set([
  'jammu & kashmir', 'j&k', 'delhi', 'punjab', 'haryana',
  'himachal pradesh', 'uttarakhand', 'chandigarh',
])

export function getDeliveryETA(state = '') {
  const s = state.toLowerCase().trim()
  if (FAST_STATES.has(s)) {
    return { label: '2–3 Business Days', fast: true }
  }
  return { label: '5–7 Business Days', fast: false }
}
